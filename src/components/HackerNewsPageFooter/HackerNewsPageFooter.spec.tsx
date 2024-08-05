import { queries, RenderResult } from '@testing-library/react'
import HackerNewsPageFooter from './HackerNewsPageFooter'
import RenderWrapper from '../../test/RenderWrapper'
import '@testing-library/jest-dom'

let component: RenderResult<typeof queries>

describe('HackerNewsPageFooter Tests', () => {
  it('should render the search input and label', () => {
    component = RenderWrapper(<HackerNewsPageFooter />)
    const searchLabel = component.getByText(/Search:/i)
    const searchInput = component.getByRole('textbox')

    expect(searchLabel).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })
})
