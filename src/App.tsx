import React from 'react'

import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react'
import { ApolloProvider } from '@apollo/client'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '@material-ui/core/styles'
import Amplify from 'aws-amplify'
import client from './apollo'
import theme from './style/theme'

import awsExports from './config/aws-exports'
import { Dashboard } from './modules/Base/Dashboard'
import { Dips } from './modules/Dips'
import { Header } from './modules/Base/Header'
import { NoMatch } from './modules/Base/NoMatch'
import { Propane } from './modules/Propane'
import { Reports } from './modules/Reports'
import { Import } from './modules/Import'
import { getTitle } from './utils'
import { useUser } from './modules/Base/user-context'

Amplify.configure(awsExports)

type AuthT = any

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

  // const [user, setUser] = React.useState<object | undefined>()
  const [user, setUser] = React.useState<AuthT>()
  const { handleSetUser } = useUser()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  // this is limited to states where user is logged in (signedin) 
  // and so wouldn't work with the above useEffect
  React.useEffect(() => {
    if (authState === 'signedin' && user?.username) {
      const USER: AuthT = {
        username: user.username,
        name: user.attributes.name,
        email: user.attributes.email,
        isLoggedIn: true,
      }
      handleSetUser(USER)
    }
  }, [authState, handleSetUser, user])

  return authState === AuthState.SignedIn && user ? (
    <ApolloProvider client={client}>
      <Helmet>
        <title>{getTitle()}</title>
      </Helmet>
      <Router>
        <ThemeProvider theme={theme}>
            <Header />
            <Switch>
              <Route component={Dashboard} exact path='/' />
              <Route component={Dips} exact path='/dips' />
              <Route component={Propane} exact path='/propane' />
              <Route component={Reports} exact path='/reports' />
              <Route component={Import} exact path='/import-data' />
              <Route component={NoMatch} path='*' />
            </Switch>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  ) : (
    <AmplifyAuthenticator style={{ borderRadius: 'green' }}>
      <AmplifySignIn slot='sign-in' hideSignUp={true} />
    </AmplifyAuthenticator>
  )
}
