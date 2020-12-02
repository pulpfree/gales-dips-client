import React from 'react'

import { ApolloProvider } from '@apollo/client'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import client from './apollo'

import logo from './logo.svg'
import './App.css'
import { StationSelector } from './modules/common/StationSelector'
import awsExports from './config/aws-exports'

Amplify.configure(awsExports)

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
      <AmplifySignOut />
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
        <StationSelector />
      </div>
    </ApolloProvider>
  )
}

export default withAuthenticator(App)
