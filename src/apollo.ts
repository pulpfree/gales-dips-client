import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

import config from './config'
import { getToken } from './utils'

/**
 * Error Response
 *
 * Logs errors and returns object with error response
 * @param {string} errString
 */
const errorResponse = (errString: string) => {
  console.error(errString) // eslint-disable-line
  // Sentry.captureMessage(errString)
  return {
    response: null,
    error: new Error(`Error: ${errString}`),
  }
}

const authLink = setContext(async (_, { headers }) => {
  let token
  try {
    token = await getToken()
  } catch (err) {
    return errorResponse(err)
  }
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// TODO: log errors to third party log management
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      const err = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      console.error(err)
      return err
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const httpLink = createHttpLink({ uri: config.BASE_URL })

const link = from([authLink, errorLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
