import { getEnv } from '../utils/main'

const prodDomain = 'https://api-prod.gdps.pfapi.io/graphql'
// const prodDomain = 'http://192.168.86.137:4000'
const stageDomain = 'https://api-stage.gdps.pfapi.io/graphql'

// const liveURI = 'https://fqhx4fm4d8.execute-api.ca-central-1.amazonaws.com/Prod/graphql'
// const localURI = 'http://127.0.0.1:3000/graphql'
const localURI = 'http://127.0.0.1:4000/'

const conf = {
  development: {
    BASE_URL: localURI,
  },
  production: {
    BASE_URL: prodDomain,
  },
  stage: {
    BASE_URL: stageDomain,
  },
  test: {
    BASE_URL: localURI,
  },
}
const config = conf[getEnv()]

// Constants
export const LOCAL_TOKEN_KEY = 'userToken'
export const STD_DATE_FORMAT = 'yyyy-MM-dd'

export default config
