import {
  act,
  fireEvent,
  queries,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import HackerNewsPageList from './HackerNewsPageList'
import RenderWrapper from '../../test/RenderWrapper'
import '@testing-library/jest-dom'
import { generateMockStories } from '../../test/mocks/mockData'

let component: RenderResult<typeof queries>

const hackerNewsPageListPrefix = 'HackerNewsPageList_'

const defaultProps = {
  data: generateMockStories(20),
  isLoading: false,
}

describe('HackerNewsPageList Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should show loading skeleton when isLoading is true', () => {
    component = RenderWrapper(
      <HackerNewsPageList {...defaultProps} isLoading={true} />,
    )
    const skeleton = component.getByTestId(
      `${hackerNewsPageListPrefix}_skeleton`,
    )
    expect(skeleton).toBeInTheDocument()
  })

  it('should render list of stories when not loading', () => {
    component = RenderWrapper(<HackerNewsPageList {...defaultProps} />)

    defaultProps.data.slice(0, 10).forEach((story) => {
      const item = component.getByTestId(`HackerNewsPageList__item-${story.id}`)
      expect(item).toBeInTheDocument()
    })
  })

  it('should load more stories when "Load More" button is clicked', async () => {
    component = RenderWrapper(<HackerNewsPageList {...defaultProps} />)

    const loadMoreButton = component.getByTestId(
      `${hackerNewsPageListPrefix}_loadMoreButton`,
    )
    expect(loadMoreButton).toBeVisible()

    fireEvent.click(loadMoreButton)

    // Check if CircularProgress is displayed
    const progress = component.container.querySelector(
      '.MuiCircularProgress-root',
    )
    expect(progress).toBeInTheDocument()

    // Advance timers by 1 second to simulate async load
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      const items = defaultProps.data
        .slice(10, 20)
        .map((item) =>
          component.getByTestId(`${hackerNewsPageListPrefix}_item-${item.id}`),
        )

      items.forEach((item) => {
        expect(item).toBeInTheDocument()
      })
    })
  })
})
