import { NoMatch } from './NoMatch'

describe('NoMatch', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouter(() => <NoMatch />)
    expect(container.innerHTML).toMatch('No match for')
  })
})