// Inspired by Redux-Toolkit

function createAction(type = '') {
  function actionCreator(...args) {
    return {
      type,
      payload: args[0] || {},
    }
  }
  actionCreator.toString = () => `${type}`

  actionCreator.type = type
  console.log('actionCreator', actionCreator)
  return actionCreator
}

export const ANIME_REDUCER_TYPES = {
  ADD_GENRE: 'ADD_GENRE',
  REMOVE_GENRE: 'REMOVE_GENRE',
  CLEAR_GENRES: 'CLEAR_GENRES',
}

export const addGenre = createAction(ANIME_REDUCER_TYPES.ADD_GENRE)
export const removeGenre = createAction(ANIME_REDUCER_TYPES.REMOVE_GENRE)
export const clearGenres = createAction(ANIME_REDUCER_TYPES.CLEAR_GENRES)

export function animeReducer(state, action) {
  const { ADD_GENRE, REMOVE_GENRE, CLEAR_GENRES } = ANIME_REDUCER_TYPES
  switch (action.type) {
    case ADD_GENRE:
      return {
        ...state,
        selectedGenres: state.selectedGenres.set(action.payload.genre, true),
      }
    case REMOVE_GENRE:
      state.selectedGenres.delete(action.payload.genre)
      return {
        ...state,
      }
    case CLEAR_GENRES:
      return {
        ...state,
        selectedGenres: new Map(),
      }
    default:
      return state
  }
}
