import React from 'react'
import { render } from '@testing-library/react'

import { PageTitle } from './PageTitle'

describe('PageTitle', () => {
  const Title = 'test title'
  it('renders correctly', () => {
    const { container } = render(<PageTitle title={Title} />)
    expect(container.innerHTML).toMatch(Title)
  })
})
