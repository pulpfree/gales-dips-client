import React from 'react'

import { ApolloProvider } from '@apollo/client'
import Amplify from 'aws-amplify'
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import awsExports from './config/aws-exports'
import client from './apollo'
import theme from './style/theme'

// import { StationSelector } from './modules/Common/StationSelector'
import { Dashboard } from './modules/Common/Dashboard'
import { Dips } from './modules/Dips'
import { Header } from './modules/Common/Header'
import { NoMatch } from './modules/Common/NoMatch'
import { Propane } from './modules/Propane'
import { Reports } from './modules/Reports'
import { Import } from './modules/Import'
import { getTitle } from './utils'

Amplify.configure(awsExports)

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <title>{getTitle()}</title>
      </Helmet>
      <Router>
        <ThemeProvider theme={theme}>
          <Header />
          {/* <AmplifySignOut /> */}

          <Switch>
            <Route component={Dashboard} exact path='/' />
            <Route component={Dips} exact path='/dips' />
            <Route component={Propane} exact path='/propane' />
            <Route component={Reports} exact path='/reports' />
            <Route component={Import} exact path='/import-data' />
            <Route path='*'>
              <NoMatch />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

// export App
// export default withAuthenticator(App)
