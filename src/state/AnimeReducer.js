/**
 * Inspired by Redux-Toolkit's createAction, see https://github.com/reduxjs/redux-toolkit
 */
import { randomize } from 'utils/random'

function createAction(type = '') {
  function actionCreator(...args) {
    return {
      type,
      payload: args[0] || {},
    }
  }
  actionCreator.toString = () => `${type}`

  actionCreator.type = type
  return actionCreator
}

export const ANIME_REDUCER_TYPES = {
  ADD_GENRE: 'ADD_GENRE',
  REMOVE_GENRE: 'REMOVE_GENRE',
  CLEAR_GENRES: 'CLEAR_GENRES',
  SET_PAGE: 'SET_PAGE',
  SET_LOADING: 'SET_LOADING',
  INITIAL_PAGE_INFO_REQUEST: 'INITIAL_PAGE_INFO_REQUEST',
  INITIAL_PAGE_INFO_SUCCESS: 'INITIAL_PAGE_INFO_SUCCESS',
  INITIAL_PAGE_INFO_ERROR: 'INITIAL_PAGE_INFO_ERROR',
}

export const addGenre = createAction(ANIME_REDUCER_TYPES.ADD_GENRE)
export const removeGenre = createAction(ANIME_REDUCER_TYPES.REMOVE_GENRE)
export const clearGenres = createAction(ANIME_REDUCER_TYPES.CLEAR_GENRES)
export const setPage = createAction(ANIME_REDUCER_TYPES.SET_PAGE)
export const setLoading = createAction(ANIME_REDUCER_TYPES.SET_LOADING)
export const initialPageInfoRequest = createAction(
  ANIME_REDUCER_TYPES.INITIAL_PAGE_INFO_REQUEST,
)
export const initialPageInfoSuccess = createAction(
  ANIME_REDUCER_TYPES.INITIAL_PAGE_INFO_SUCCESS,
)
export const initialPageInfoError = createAction(
  ANIME_REDUCER_TYPES.INITIAL_PAGE_INFO_ERROR,
)

export function animeReducer(state, { type, payload }) {
  const {
    ADD_GENRE,
    REMOVE_GENRE,
    CLEAR_GENRES,
    SET_PAGE,
    SET_LOADING,
    INITIAL_PAGE_INFO_REQUEST,
    INITIAL_PAGE_INFO_SUCCESS,
    INITIAL_PAGE_INFO_ERROR,
  } = ANIME_REDUCER_TYPES
  switch (type) {
    case ADD_GENRE:
      return {
        ...state,
        selectedGenres: state.selectedGenres.set(payload.genre, true),
      }
    case REMOVE_GENRE:
      state.selectedGenres.delete(payload.genre)
      return {
        ...state,
      }
    case CLEAR_GENRES:
      return {
        ...state,
        selectedGenres: new Map(),
      }
    case SET_PAGE:
      return {
        ...state,
        lastPage: payload.page,
      }
    case SET_LOADING:
      return {
        ...state,
        fetchStatus: payload.status,
      }
    case INITIAL_PAGE_INFO_REQUEST:
      return {
        ...state,
        fetchStatus: 'pending',
      }
    case INITIAL_PAGE_INFO_SUCCESS:
      return {
        ...state,
        fetchStatus: 'fulfilled',
        lastPage: payload.data.Page.pageInfo.lastPage,
        page: randomize(payload.data.Page.pageInfo.lastPage),
      }
    case INITIAL_PAGE_INFO_ERROR:
      return {
        ...state,
        fetchStatus: 'error',
        error: payload,
      }
    default:
      return state
  }
}
