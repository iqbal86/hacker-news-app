import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'
import useFetchStories from './useFetchStories'
import { ReactNode } from 'react'
import { generateMockStories } from '../test/mocks/mockData'

const mockStoriesService = {
  getStoryList: jest.fn(),
}

jest.mock('../common/ApiProvider', () => ({
  useApiContext: () => ({
    storiesService: mockStoriesService,
  }),
}))

const hookWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useFetchStories', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useFetchStories(), {
      wrapper: hookWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
    expect(result.current.errorMessage).toBe(null)
  })

  it('should fetch stories successfully', async () => {
    const mockData = generateMockStories(1)
    mockStoriesService.getStoryList.mockResolvedValue(mockData)

    const { result, waitForNextUpdate } = renderHook(() => useFetchStories(), {
      wrapper: hookWrapper(),
    })
    expect(mockStoriesService.getStoryList).toHaveBeenCalledTimes(1)
    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toEqual(mockData)
    expect(result.current.errorMessage).toBe(null)
  })

  it('should handle errors when fetching stories', async () => {
    mockStoriesService.getStoryList.mockRejectedValue(
      new Error('Network Error'),
    )

    const { result, waitForNextUpdate } = renderHook(() => useFetchStories(), {
      wrapper: hookWrapper(),
    })

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.errorMessage).toBe(
      'Failed to load stories. Please try again later.',
    )
  })
})
