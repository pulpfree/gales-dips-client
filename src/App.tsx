import React from 'react'

import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react'
import { ApolloProvider } from '@apollo/client'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '@material-ui/core/styles'
import Amplify from 'aws-amplify'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { Alerts, AlertProvider } from './modules/Base/Alert'
import { Dashboard } from './modules/Base/Dashboard'
import { Dips } from './modules/Dips'
import { ErrorAlert } from './modules/Base/Errors'
import { getTitle } from './utils'
import { Header } from './modules/Base/Header'
import { Import } from './modules/Import'
import { NoMatch } from './modules/Base/NoMatch'
import { Propane } from './modules/Propane'
import { Reports } from './modules/Reports'
import { setToken } from './utils'
import { useUserDispatch } from './modules/Base/User/UserContext'
import awsExports from './config/aws-exports'
import client from './apollo'
import theme from './style/theme'

Amplify.configure(awsExports)

export const App: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>()

  /**
   * TODO: Consider refactoring with better types
   * The declaration below using 'object | undefined' is the recommended approach by amplify
   * see: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#use-cases
   * However it does cause typescript errors when attempting to access the values and also since some of the values
   * are nested in a secondary object, I just went with the 'any' types
   * see: https://stackoverflow.com/questions/36607979/how-to-get-around-property-does-not-exist-on-object/45090885
   * and: https://stackoverflow.com/questions/43338763/typescript-property-does-not-exist-on-type-object
   */

  const [authData, setAuthData] = React.useState<any | undefined>() // eslint-disable-line @typescript-eslint/no-explicit-any
  const userDispatch = useUserDispatch()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setAuthData(authData)
    })
  }, [])

  React.useEffect(() => {
    if (authState === 'signedin' && authData?.username) {
      const USER = {
        username: authData.username,
        name: authData.attributes.name,
        email: authData.attributes.email,
        isLoggedIn: true,
      }
      setToken(authData)
      userDispatch(USER)
    }
  }, [authState, userDispatch, authData])

  return authState === AuthState.SignedIn && authData ? (
    <ApolloProvider client={client}>
      <Helmet>
        <title>{getTitle()}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <Router>
            <Alerts />
            <Header />
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Switch>
                  <Route component={Dashboard} exact path='/' />
                  <Route component={Dips} exact path='/dips' />
                  <Route component={Dips} path='/dips/:date/:stationID' />
                  <Route component={Propane} exact path='/propane' />
                  <Route component={Reports} exact path='/reports' />
                  <Route component={Import} exact path='/import-data' />
                  <Route component={NoMatch} path='*' />
                </Switch>
              </MuiPickersUtilsProvider>
            </ErrorBoundary>
          </Router>
        </AlertProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AmplifyAuthenticator style={{ borderRadius: 'green' }}>
      <AmplifySignIn slot='sign-in' hideSignUp={true} />
    </AmplifyAuthenticator>
  )
}
