import React from 'react'
/**
 * Inspired by use-reducer-logger https://github.com/jefflombard/use-reducer-logger  - This gives a redux logger like interface for useReducer
 * @param {Function} reducer - The reducer you are using in useReducer. Doesn't modify the reducer at all
 */
function Logger(reducer) {
  const reducerWithLogger = React.useCallback(
    (state, action) => {
      const next = reducer(state, action)
      console.group('Reducer Logger')
      console.log('%cPrevious State:', 'color: #9E9E9E; font-weight: 700;', state)
      console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action)
      console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', next)
      console.groupEnd()
      return next
    },
    [reducer],
  )

  return reducerWithLogger
}
export default Logger
