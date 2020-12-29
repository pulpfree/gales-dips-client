import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import config from './config'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      const err = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      return err
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const httpLink = createHttpLink({ uri: config.BASE_URL })

const link = from([errorLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
