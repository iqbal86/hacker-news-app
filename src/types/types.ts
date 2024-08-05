export type StoryIds = number[]

export type StoryDetail = {
  by: string
  descendants?: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type?: string
  url: string
}

export interface PageProps {
  userInfo?: {
    locale?: string
  }
  [key: string]: unknown
}

export type StoriesService = {
  getStoryList: () => Promise<StoryDetail[]>
}
