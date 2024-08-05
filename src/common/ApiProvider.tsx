/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { getStoryList } from '../services/storiesService'
import { AxiosClient, IAxiosClient } from '../utility/AxiosClient'
import { StoryDetail } from '../types/types'

type ApiContextProps = {
  storiesService: {
    getStoryList: () => Promise<StoryDetail[]>
  }
}

export const ApiContext = createContext<ApiContextProps>({} as ApiContextProps)

const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState<IAxiosClient>(
    new AxiosClient({
      baseURL: 'https://hacker-news.firebaseio.com/v0',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  )

  const apiContext: ApiContextProps = useMemo(
    () => ({
      storiesService: {
        getStoryList: async () => getStoryList(client),
      },
    }),
    [client],
  )

  return (
    <ApiContext.Provider value={apiContext}>{children}</ApiContext.Provider>
  )
}

export const useApiContext = () => useContext(ApiContext)

export default ApiProvider
