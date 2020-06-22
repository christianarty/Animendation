import { gql } from 'apollo-boost'

export const GET_RANDOM_ANIME_WITH_GENRE = gql`
  query GET_RANDOM_ANIME(
    $page: Int!
    $isAdult: Boolean = false
    $genreList: [String]!
  ) {
    Page(perPage: 50, page: $page) {
      media(type: ANIME, isAdult: $isAdult, genre_in: $genreList) {
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

export const GET_RANDOM_ANIME = gql`
  query GET_RANDOM_ANIME($page: Int!, $isAdult: Boolean = false) {
    Page(perPage: 50, page: $page) {
      media(type: ANIME, isAdult: $isAdult) {
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
export const GET_GENRES = gql`
  {
    GenreCollection
  }
`
