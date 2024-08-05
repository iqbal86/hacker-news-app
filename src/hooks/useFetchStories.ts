import { useQuery } from 'react-query'
import { useApiContext } from '../common/ApiProvider'
import { StoriesService } from '../types/types'
import { useState } from 'react'

const fetchStories = async (storiesService: StoriesService) => {
  return storiesService.getStoryList()
}

const useFetchStories = () => {
  const { storiesService } = useApiContext()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data, isLoading } = useQuery(
    'stories',
    () => fetchStories(storiesService),
    {
      onError: () => {
        setErrorMessage('Failed to load stories. Please try again later.')
      },
    },
  )

  return { data, errorMessage, isLoading }
}

export default useFetchStories
