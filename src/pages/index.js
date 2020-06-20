import { useQuery } from '@apollo/react-hooks'
import { GET_GENRES, GET_RANDOM_ANIME } from 'api/queries'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { CardGroup } from 'components/card-group'
import { Checkbox } from 'components/checkbox'
import { Navigation } from 'components/navigation'
import React, { useEffect, useState } from 'react'
import shuffle from 'utils/shuffle'
import styles from '../styles/home.module.css'

const randomize = (endingNumber) => Math.floor(Math.random() * endingNumber) + 1

let lastPage = 260
const page = randomize(lastPage)
const randomAnimeNumbers = shuffle().slice(0, 3)

function Home() {
  const [selectedGenres, setSelectedGenres] = useState([])

  const onChange = (e) => {
    e.preventDefault()
    setSelectedGenres([...selectedGenres, e.target.value])
  }

  const { data, loading } = useQuery(GET_RANDOM_ANIME, {
    variables: { page },
    ssr: true,
    fetchPolicy:
      process.env.NODE_ENV === 'production' ? 'network-only' : 'cache-and-network',
  })
  const { data: genreData } = useQuery(GET_GENRES, {
    ssr: true,
    fetchPolicy:
      process.env.NODE_ENV === 'production' ? 'network-only' : 'cache-and-network',
  })

  useEffect(() => {
    window.localStorage.setItem('last_page', data?.Page?.pageInfo?.lastPage)
    if (!window.localStorage.getItem('last_page') === lastPage) {
      lastPage = window.localStorage.getItem('last_page')
    }
  }, [data])
  const animeList = data?.Page.media
  const genres = genreData?.GenreCollection
  return (
    <div className={styles.container}>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
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
            <Button size="large">Randomize</Button>

            {genres && (
              <div className={styles.grid_checkbox}>
                {genres.map((genre, idx) => (
                  <Checkbox key={idx} onChange={onChange} genre={genre} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
