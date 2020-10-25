import {
  GET_GENRES,
  GET_RANDOM_ANIME,
  GET_RANDOM_ANIME_WITH_GENRE,
  GET_INITIAL_PAGEINFO,
} from 'api/queries'
import { Button } from 'components/button'
import { CardGroup } from 'components/card-group'
import { Checkbox } from 'components/checkbox'
import { Navigation } from 'components/navigation'
import React, { useEffect, useReducer } from 'react'
import {
  addGenre,
  animeReducer,
  clearGenres,
  removeGenre,
  setPage,
  setLoading,
  initialPageInfoRequest,
  initialPageInfoSuccess,
  initialPageInfoError,
} from 'state/AnimeReducer'
import styles from 'styles/home.module.css'
import { useQuery, useClient } from 'urql'
import { isDevelopment, isProduction } from 'utils/environment'
import * as LocalStorage from 'utils/localStorage'
import { shuffle, randomize } from 'utils/random'
import logger from 'utils/UseReducerLogger'
import uniqueId from 'lodash/uniqueId'

// let lastPage = 260
// const page = randomize(lastPage)
const randomAnimeNumbers = shuffle().slice(0, 3)

const initialState = {
  selectedGenres: new Map(),
  initialPage: 1,
  lastPage: null,
  fetchStatus: 'idle',
  error: null,
  page: null,
}

// for getting the page scenario, on mount and whenever selectedGenres change, we want to get the pageInfo only.

function Home() {
  const [state, dispatch] = useReducer(
    isProduction ? animeReducer : logger(animeReducer),
    initialState,
  )

  const client = useClient()
  useEffect(() => {
    dispatch(initialPageInfoRequest())
    client
      .query(GET_INITIAL_PAGEINFO, { initialPage: state.initialPage })
      .toPromise()
      .then((result) => dispatch(initialPageInfoSuccess(result)))
      .catch((error) => dispatch(initialPageInfoError(error)))
  }, [])

  const [animeResult, reExecuteAnimeQuery] = useQuery({
    query: GET_RANDOM_ANIME,
    variables: { page: state.page },
    pause: state.page === null,
    fetchPolicy: isProduction ? 'network-only' : 'cache-and-network',
  })
  const [selectedAnimeResult, executeSelectedAnimeQuery] = useQuery({
    query: GET_RANDOM_ANIME_WITH_GENRE,
    variables: {
      page: state.initialPage,
      genreList: Array.from(state.selectedGenres.keys()),
    },
    pause: true,
    fetchPolicy: isProduction ? 'network-only' : 'cache-and-network',
  })
  const [genreResult, reExecuteGenreQuery] = useQuery({
    query: GET_GENRES,
    fetchPolicy: isProduction ? 'network-only' : 'cache-and-network',
  })

  const { data: animeData, fetching: animeFetching, error: animeError } = animeResult
  const { data: genreData, fetching: genreFetching, error: genreError } = genreResult

  function handleOnChange(e) {
    const genre = e.target.value
    const isChecked = e.target.checked
    isChecked ? dispatch(addGenre({ genre })) : dispatch(removeGenre({ genre }))
  }
  function handleClearAll(e) {
    e.preventDefault()
    dispatch(clearGenres())
  }
  function handleOnClick(e) {
    // e.preventDefault()
    console.log('CLICKED')
    executeSelectedAnimeQuery()
  }

  const animeList = animeData?.Page.media
  const genres = genreData?.GenreCollection
  console.log('selectedAnimeResult', selectedAnimeResult)
  return (
    <div className={styles.container}>
      {animeFetching || genreFetching || state.fetchStatus === 'pending' ? (
        // TODO: Give an actual loading indicator
        <div>loading...</div>
      ) : (
        <React.Fragment>
          {' '}
          <Navigation />
          <div className={styles.grid}>
            <CardGroup
              cards={[
                {
                  id: 1,
                  image:
                    animeList && animeList[randomAnimeNumbers[0]]?.coverImage?.large,
                  side: 'left',
                },
                {
                  id: 2,
                  image:
                    animeList && animeList[randomAnimeNumbers[1]]?.coverImage?.large,
                  side: 'center',
                },
                {
                  id: 3,
                  image:
                    animeList && animeList[randomAnimeNumbers[2]]?.coverImage?.large,
                  side: 'right',
                },
              ]}
            />
            <Button onClick={handleOnClick} size="large">
              Randomize
            </Button>

            {genres && (
              <React.Fragment>
                <div className={styles.grid_checkbox}>
                  {genres.map((genre) => (
                    <Checkbox
                      key={uniqueId('checkbox')}
                      checked={state.selectedGenres.get(genre)}
                      onChange={handleOnChange}
                      genre={genre}
                    />
                  ))}
                </div>
                <Button onClick={handleClearAll} size="medium">
                  {' '}
                  Clear All
                </Button>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Home
