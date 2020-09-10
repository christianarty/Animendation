import {
  GET_GENRES,
  GET_RANDOM_ANIME,
  GET_RANDOM_ANIME_WITH_GENRE,
} from 'api/queries'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { CardGroup } from 'components/card-group'
import { Checkbox } from 'components/checkbox'
import { Navigation } from 'components/navigation'
import React, { useEffect, useReducer } from 'react'
import { addGenre, animeReducer, clearGenres, removeGenre } from 'state/AnimeReducer'
import styles from 'styles/home.module.css'
import { useQuery } from 'urql'
import { isDevelopment, isProduction } from 'utils/environment'
import * as LocalStorage from 'utils/localStorage'
import shuffle from 'utils/shuffle'
import logger from 'utils/UseReducerLogger'

function randomize(endingNumber) {
  return Math.floor(Math.random() * endingNumber) + 1
}

let lastPage = 260
const page = randomize(lastPage)
const randomAnimeNumbers = shuffle().slice(0, 3)

const initialState = {
  selectedGenres: new Map(),
  executeAnimeQuery: false,
}

function Home() {
  const [state, dispatch] = useReducer(
    isDevelopment ? logger(animeReducer) : animeReducer,
    initialState,
  )

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
    e.preventDefault()
    const trueObjects = []
    for (let [key, value] of state.selectedGenres.entries()) {
      if (value) {
        trueObjects.push(key)
      }
    }
    executeSelectedAnimeQuery()
  }
  const listOfGenres = Array.from(state.selectedGenres.keys())
  const [animeResult, reExecuteAnimeQuery] = useQuery({
    query: GET_RANDOM_ANIME,
    variables: { page },
    fetchPolicy: isProduction ? 'network-only' : 'cache-and-network',
  })
  const [selectedAnimeResult, executeSelectedAnimeQuery] = useQuery({
    query: GET_RANDOM_ANIME_WITH_GENRE,
    variables: { page, genreList: listOfGenres },
    pause: true,
    fetchPolicy: isProduction ? 'network-only' : 'cache-and-network',
  })
  const [genreResult, reExecuteGenreQuery] = useQuery({
    query: GET_GENRES,
    fetchPolicy: isProduction ? 'network-only' : 'cache-and-network',
  })

  const { data: animeData, fetching: animeFetching, error: animeError } = animeResult
  const { data: genreData, fetching: genreFetching, error: genreError } = genreResult

  useEffect(() => {
    LocalStorage.setItem('last_page', animeData?.Page?.pageInfo?.lastPage)
    if (!LocalStorage.getItem('last_page') === lastPage) {
      lastPage = LocalStorage.getItem('last_page')
    }
  }, [animeData])

  const animeList = animeData?.Page.media
  const genres = genreData?.GenreCollection
  return (
    <div className={styles.container}>
      {animeFetching || genreFetching ? (
        // TODO: Give an actual loading indicator
        <div>loading...</div>
      ) : (
        <React.Fragment>
          {' '}
          <Navigation />
          <div className={styles.grid}>
            <CardGroup>
              <Card
                image={animeList[randomAnimeNumbers[0]].coverImage.large}
                side="left"
              />
              <Card image={animeList[randomAnimeNumbers[1]].coverImage.large} main />
              <Card
                image={animeList[randomAnimeNumbers[2]].coverImage.large}
                side="right"
              />
            </CardGroup>
            <Button onClick={handleOnClick} size="large">
              Randomize
            </Button>

            {genres && (
              <React.Fragment>
                <div className={styles.grid_checkbox}>
                  {genres.map((genre, idx) => (
                    <Checkbox
                      key={idx}
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
