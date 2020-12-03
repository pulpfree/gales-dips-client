import React from 'react'

import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'

import { App } from './App'

describe('App', () => {
  it('renders successfully', () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch('Select Activity')
  })

  describe('router', () => {
    it("renders home page on '/'", () => {
      const { container } = renderWithRouter(() => <App />, '/')
      expect(container.innerHTML).toMatch('Select Activity')
    })
  })
})
