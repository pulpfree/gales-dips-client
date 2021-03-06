import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { Auth } from 'aws-amplify'
import { ApolloProvider } from 'react-apollo'
import { Authenticator } from 'aws-amplify-react'
import { ConnectedRouter } from 'react-router-redux'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router'
import Amplify, { Auth } from 'aws-amplify'
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable'
import LogRocket from 'logrocket'

import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider'
import * as Sentry from '@sentry/browser'

import { getTitle } from '../../utils/utils'
import { LOCAL_TOKEN_KEY } from '../../config/constants'
import Alert from '../Common/Alert'
import awsExports from '../Auth/aws-exports'
import ChangePassword from '../Profile/ChangePassword'
import client from '../../apollo'
import Dashboard from './Dashboard'
import Dips from '../Dips/Dips.cntr'
import Download from '../Common/Download'
import Errors from '../Error/Error.cntr'
import ImportData from '../ImportData/ImportData'
import Profile from '../Profile/Profile'
import Propane from '../Propane/Propane'
import withRoot from '../../withRoot'

// Authentication components
import ConfirmSignIn from '../Auth/ConfirmSignIn'
import SignIn from '../Auth/SignIn'
import ForgotPassword from '../Auth/ForgotPassword'
import RequireNewPassword from '../Auth/RequireNewPassword'

// Sentry
// import { SENTRY_DSN } from '../../config/constants'


Amplify.configure(awsExports)
const history = createHistory()

const Loading = () => <div>Loading...</div>

const Admin = Loadable({
  loader: () => import('../Admin/Admin'),
  loading: Loading,
})

const Reports = Loadable({
  loader: () => import('../Reports/Reports'),
  loading: Loading,
})

// Sentry.init({ dsn: SENTRY_DSN })

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })
    })
    Sentry.captureException(error)
  }

  render() {
    if (this.props.authState !== 'signedIn') return null

    if (this.state.error) {
      return <Alert type="danger">{this.state.error}</Alert>
    }

    return (
      <ApolloProvider client={client}>
        <Helmet>
          <title>{getTitle()}</title>
        </Helmet>
        <ConnectedRouter history={history}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div>
              <Errors />
              <Switch>
                <Route
                  component={Dashboard}
                  exact
                  path="/"
                />
                <Route
                  component={Dips}
                  exact
                  path="/dips"
                />
                <Route
                  component={Dips}
                  path="/dips/:date/:stationID"
                />
                <Route
                  component={Reports}
                  path="/reports"
                />
                <Route
                  component={Propane}
                  exact
                  path="/propane"
                />
                <Route
                  component={Propane}
                  path="/propane/:date"
                />
                <Route
                  component={ImportData}
                  path="/import-data"
                />
                <Route
                  component={Admin}
                  path="/admin"
                />
                <Route
                  component={Profile}
                  path="/profile"
                />
                <Route
                  component={ChangePassword}
                  path="/change-password"
                />
                <Route
                  component={Download}
                  path="/download"
                />
              </Switch>
            </div>
          </MuiPickersUtilsProvider>
        </ConnectedRouter>
      </ApolloProvider>
    )
  }
}

Index.propTypes = {
  authState: PropTypes.string,
}
Index.defaultProps = {
  authState: '',
}

class AppWithAuth extends Component { // eslint-disable-line react/no-multi-comp
  state = {
    user: '', // eslint-disable-line
  }

  async componentWillMount() {
    const user = await Auth.currentAuthenticatedUser()
    if (user) {
      // console.log('fetching user from Auth', user) // eslint-disable-line
      const storage = window.localStorage
      storage.setItem(LOCAL_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken)

      const username = user.signInUserSession.idToken.payload['cognito:username']
      const { name } = user.signInUserSession.idToken.payload
      const userId = user.username
      storage.setItem(LOCAL_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken)
      LogRocket.identify(userId, {
        name,
        username,
      })
    }
  }

  handleAuthStateChange(state) { // eslint-disable-line
    // console.log('state in handleAuthStateChange: ', state) // eslint-disable-line
    // if (state === 'signedIn') {
    // Do something when the user has signed-in
    // }
  }

  render() {
    // console.log('user in render: ', this.state)

    return (
      <div>
        <Authenticator
          hideDefault
          onStateChange={this.handleAuthStateChange}
        >
          <Index />
          <SignIn />
          <ConfirmSignIn />
          <ForgotPassword />
          <RequireNewPassword />
        </Authenticator>
      </div>
    )
  }
}

export default withRoot(AppWithAuth)
