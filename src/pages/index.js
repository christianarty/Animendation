import styles from '../styles/home.module.css'
import { Navigation } from 'components/navigation'
import { Card } from 'components/card'
import { CardGroup } from 'components/card-group'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import shuffle from 'utils/shuffle'
const GET_RANDOM_ANIME = gql`
  query GET_RANDOM_ANIME($page: Int!) {
    Page(perPage: 50, page: $page) {
      media(type: ANIME, isAdult: false) {
        title {
          romaji
          english
          native
          userPreferred
        }
        idMal
        id
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
    }
  }
`

const randomize = (endingNumber) => Math.floor(Math.random() * endingNumber) + 1

let lastPage = 260
const page = randomize(lastPage)
const randomAnimeNumber = shuffle()[0]
function Home() {
  const { data, loading } = useQuery(GET_RANDOM_ANIME, {
    variables: { page },
    ssr: true,
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    window.localStorage.setItem('last_page', data?.Page?.pageInfo?.lastPage)
    if (!window.localStorage.getItem('last_page') === lastPage) {
      lastPage = window.localStorage.getItem('last_page')
    }
  }, [data])
  const animeList = data?.Page.media
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
                image={animeList[randomAnimeNumber].coverImage.large}
                side="left"
              />
              <Card image={animeList[randomAnimeNumber].coverImage.large} main />
              <Card
                image={animeList[randomAnimeNumber].coverImage.large}
                side="right"
              />
            </CardGroup>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
