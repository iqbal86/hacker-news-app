import HackerNewsPage from './HackerNewsPage'
import useFetchStories from '../hooks/useFetchStories'

export const HackerNewsPageContainer = () => {
  const { data, errorMessage, isLoading } = useFetchStories()

  console.log('data..', data)

  return (
    <HackerNewsPage
      data={data || []}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  )
}

export default HackerNewsPageContainer
