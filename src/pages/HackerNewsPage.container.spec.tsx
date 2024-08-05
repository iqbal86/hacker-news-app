import { queries, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HackerNewsPageContainer from './HackerNewsPage.container'
import useFetchStories from '../hooks/useFetchStories'
import RenderWrapper from '../test/RenderWrapper'
import { generateMockStories } from '../test/mocks/mockData'

jest.mock('../hooks/useFetchStories')

let component: RenderResult<typeof queries>

const mockUseFetchStories = useFetchStories as jest.MockedFn<
  typeof useFetchStories
>

const hackerNewsPageListPrefix = 'HackerNewsPageList_'
const hackerNewsPagePrefix = 'HackerNewsPage_'

describe('HackerNewsPageContainer Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with loading state', () => {
    mockUseFetchStories.mockReturnValue({
      data: undefined,
      errorMessage: null,
      isLoading: true,
    })

    component = RenderWrapper(<HackerNewsPageContainer />)

    expect(
      component.getByTestId(`${hackerNewsPageListPrefix}_skeleton`),
    ).toBeInTheDocument()
  })

  it('should fetch stories successfully', () => {
    const mockData = generateMockStories(1)
    mockUseFetchStories.mockReturnValue({
      data: mockData,
      errorMessage: null,
      isLoading: false,
    })

    component = RenderWrapper(<HackerNewsPageContainer />)

    expect(
      component.getByTestId(
        `${hackerNewsPageListPrefix}_item-${mockData[0].id}`,
      ),
    ).toBeInTheDocument()
  })

  it('should handle errors when fetching stories', () => {
    mockUseFetchStories.mockReturnValue({
      data: undefined,
      errorMessage: 'Failed to load stories. Please try again later.',
      isLoading: false,
    })

    component = RenderWrapper(<HackerNewsPageContainer />)

    expect(
      component.getByTestId(`${hackerNewsPagePrefix}_error`),
    ).toBeInTheDocument()
    expect(
      component.getByTestId(`${hackerNewsPagePrefix}_error`),
    ).toHaveTextContent('Failed to load stories. Please try again later.')
  })
})
