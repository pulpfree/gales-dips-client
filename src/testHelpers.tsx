import React from 'react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'
import { Router } from 'react-router-dom'

type RenderWithRouter = (
  renderComponent: () => React.ReactNode,
  route?: string,
) => RenderResult & { history: MemoryHistory }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      renderWithRouter: RenderWithRouter
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace globalThis {
    const renderWithRouter: RenderWithRouter
  }
}

global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory()
  if (route) {
    history.push(route)
  }
  return {
    ...render(<Router history={history}>{renderComponent()}</Router>),
    history,
  }
}
