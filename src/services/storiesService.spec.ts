import { mockIAxiosClient } from '../test/mocks/mockIAxiosClient'
import { getStoryDetails, getStoryIds, getStoryList } from './storiesService'

describe('stories service test', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should getStoryIds', async () => {
    mockIAxiosClient.get.mockResolvedValueOnce([1, 2, 3])
    const result = await getStoryIds(mockIAxiosClient)

    expect(mockIAxiosClient.get).toHaveBeenCalledWith(
      `/topstories.json?print=pretty`,
    )
    expect(result).toStrictEqual([1, 2, 3])
  })

  it('should getStoryDetails', async () => {
    mockIAxiosClient.get.mockResolvedValueOnce({
      id: 1,
      title: 'TITLE',
    })
    const result = await getStoryDetails(mockIAxiosClient, 1)

    expect(mockIAxiosClient.get).toHaveBeenCalledWith(
      '/item/1.json?print=pretty',
    )
    expect(result).toStrictEqual({ title: 'TITLE', id: 1 })
  })

  it('should getStoryList', async () => {
    mockIAxiosClient.get.mockResolvedValueOnce([1])
    mockIAxiosClient.get.mockResolvedValueOnce({
      id: 1,
      title: 'TITLE',
    })

    const result = await getStoryList(mockIAxiosClient)

    expect(mockIAxiosClient.get).toHaveBeenCalledWith(
      `/topstories.json?print=pretty`,
    )
    expect(mockIAxiosClient.get).toHaveBeenCalledWith(
      '/item/1.json?print=pretty',
    )
    expect(result).toStrictEqual([{ id: 1, title: 'TITLE' }])
  })
})
