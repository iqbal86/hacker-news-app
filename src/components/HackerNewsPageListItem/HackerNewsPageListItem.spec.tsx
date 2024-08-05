import { queries, RenderResult } from '@testing-library/react'
import HackerNewsPageListItem from './HackerNewsPageListItem'
import RenderWrapper from '../../test/RenderWrapper'
import '@testing-library/jest-dom'
import { generateMockStories } from '../../test/mocks/mockData'

let component: RenderResult<typeof queries>

const hackerNewsPageListItemPrefix = 'HackerNewsPageListItem_'

const mockStories = generateMockStories(1)
const defaultProps = mockStories[0]

describe('HackerNewsPageListItem Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should render story details correctly', () => {
    component = RenderWrapper(
      <HackerNewsPageListItem {...defaultProps} comments={20} index={1} />,
    )
    const title = component.getByTestId(
      `${hackerNewsPageListItemPrefix}_itemTitle-1`,
    )
    const comments = component.getByTestId(
      `${hackerNewsPageListItemPrefix}_itemComments-1`,
    )
    expect(title).toBeInTheDocument()
    expect(comments).toBeInTheDocument()
  })

  it('should format the URL correctly for github.com', () => {
    component = RenderWrapper(
      <HackerNewsPageListItem {...defaultProps} comments={20} index={1} />,
    )
    const url = component.getByTestId(
      `${hackerNewsPageListItemPrefix}_itemUrl-1`,
    )
    expect(url).toHaveTextContent('github.com')
  })

  it('should format the URL correctly for a non-github.com URL', () => {
    const nonGithubUrlProps = {
      ...defaultProps,
      url: 'https://example.com/piano',
    }
    component = RenderWrapper(
      <HackerNewsPageListItem {...nonGithubUrlProps} comments={20} index={1} />,
    )
    const url = component.getByTestId(
      `${hackerNewsPageListItemPrefix}_itemUrl-1`,
    )
    expect(url).toHaveTextContent('example.com')
  })

  it('should display "1 hour ago" when the time difference is exactly 1 hour', () => {
    const oneHourAgo = Math.floor(Date.now() / 1000) - 3600
    const oneHourAgoProps = { ...defaultProps, time: oneHourAgo }

    component = RenderWrapper(
      <HackerNewsPageListItem {...oneHourAgoProps} comments={20} index={1} />,
    )
    const timeAgoElement = component.getByTestId(
      `${hackerNewsPageListItemPrefix}_hourAgo-${1}`,
    )
    expect(timeAgoElement).toBeInTheDocument()
  })
})
