import { gql } from "graphql-request";

export const GET_INITIAL_PAGEINFO = gql`
  query GET_INITIAL_PAGEINFO($initialPage: Int!, $isAdult: Boolean = false) {
    Page(perPage: 50, page: $initialPage) {
      media(type: ANIME, isAdult: $isAdult) {
        id
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
`;
export const GET_INITIAL_PAGEINFO_WITH_GENRE = gql`
  query GET_INITIAL_PAGEINFO_WITH_GENRE(
    $initialPage: Int!
    $isAdult: Boolean = false
    $genreList: [String]!
  ) {
    Page(perPage: 50, page: $initialPage) {
      media(type: ANIME, isAdult: $isAdult, genre_in: $genreList) {
        id
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
`;

export const GET_RANDOM_ANIME_WITH_GENRE = gql`
  query GET_RANDOM_ANIME_WITH_GENRE(
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
`;

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
`;
export const GET_GENRES = gql`
  {
    GenreCollection
  }
`;
