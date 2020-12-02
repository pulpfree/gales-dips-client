import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

import config from './config'

const httpLink = createHttpLink({ uri: config.BASE_URL })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client
