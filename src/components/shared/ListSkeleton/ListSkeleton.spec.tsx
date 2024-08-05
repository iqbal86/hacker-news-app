import { queries, render, RenderResult } from '@testing-library/react'
import EventListSkeleton from './ListSkeleton'
let component: RenderResult<typeof queries>

const prefix = 'ListSkeleton_'

describe('ListSkeleton Tests', () => {
  beforeEach(() => {
    component = render(<EventListSkeleton />)
  })
  it('should render the list skeleton', () => {
    expect(component).toBeTruthy()
    const loader = component.getByTestId(`${prefix}_container`)
    expect(loader).toBeTruthy()
  })
})
