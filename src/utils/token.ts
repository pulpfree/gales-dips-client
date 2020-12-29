/**
 * Module returns valid cognito token
 *
 * Inspiration for this found here https://stackoverflow.com/questions/53375350/how-handle-refresh-token-service-in-aws-amplify-js
 * Docs for amazon-cognito-identity-js https://www.npmjs.com/package/amazon-cognito-identity-js
 *
 * @TODO: get rid of TS 'any' where possible
 */
import {
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js'

import { LOCAL_TOKEN_KEY } from '../config'

/**
 * Get current user session.
 *
 * @param {object} cognitoUser session
 */
function getSession(cognitoUser: CognitoUser): Promise<CognitoUserSession | null> {
  return new Promise((resolve, reject) => {
    cognitoUser.getSession((err: Error, session: CognitoUserSession | null) => {
      if (err) reject(err)
      resolve(session)
    })
  })
}

/**
 * Refresh user session
 *
 * @param {object} cognitoUser
 * @param {object} session
 */
function refreshSession(cognitoUser: CognitoUser, session: CognitoUserSession) {
  return new Promise((resolve, reject) => {
    const refreshToken: CognitoRefreshToken = session.getRefreshToken()
    cognitoUser.refreshSession(refreshToken, (err, refSession) => {
      if (err) reject(err)
      resolve(refSession)
    })
  }) as Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Parse local token.
 *
 * Token is stored in localStorage.
 *
 * @returns {object|bool} parsed token or false
 */
function parseLocalToken() {
  const localToken = window.localStorage.getItem(LOCAL_TOKEN_KEY)
  if (!localToken) return false
  return JSON.parse(atob(localToken.split('.')[1]))
}

/**
 * Refresh token.
 *
 * Refresh token if about to expire, or return current token.
 *
 * @returns {string} cognito token
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getToken(): Promise<any | null> {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  const storage = window.localStorage

  // const dte: number = (new Date() / 1000): number
  const now = Math.floor(new Date().valueOf() / 1000)
  const expireBuffer = 60 * 5
  const cutoffTime = now + expireBuffer

  const tokenObj = parseLocalToken()
  if (tokenObj && cutoffTime < tokenObj.exp) {
    console.log('returning local token') // eslint-disable-line no-console
  }
  if (tokenObj && cutoffTime < tokenObj.exp) return storage.getItem(LOCAL_TOKEN_KEY)

  const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID ? process.env.REACT_APP_COGNITO_POOL_ID : '',
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID ? process.env.REACT_APP_COGNITO_CLIENT_ID : '',
  }
  const userPool = new CognitoUserPool(poolData)
  const cognitoUser: CognitoUser = userPool.getCurrentUser()! // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const session = await getSession(cognitoUser)
  // const expire = session.idToken.payload.exp
  // console.log('time to expire:', expire - now)
  // console.log('time to reset token:', expire - cutoffTime)
  // if (tokenObj && cutoffTime < expire) return storage.getItem(LOCAL_TOKEN_KEY)

  if (session) {
    const rSession = await refreshSession(cognitoUser, session)
    const userToken = rSession.accessToken.jwtToken
    console.log('userToken refreshed') // eslint-disable-line no-console
    return userToken
  }
  return null
}

// TODO: check if we can substitute 'any' for the user argument
export function setToken(user: any): void { // eslint-disable-line
  const storage = window.localStorage
  storage.setItem(LOCAL_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken)
}
