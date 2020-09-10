import React from 'react'
import PropTypes from 'prop-types'
import { createClient, Provider } from 'urql'
import 'normalize.css'
import 'styles/global.css'

// const client = new ApolloClient({
//   uri: 'https://graphql.anilist.co',
//   cache: new InMemoryCache(),
// })

const client = createClient({
  url: 'https://graphql.anilist.co',
})

function App({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
