import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "normalize.css";
import "../styles/global.css";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
});

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
