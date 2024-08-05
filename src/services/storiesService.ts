import { StoryDetail, StoryIds } from '../types/types'
import { IAxiosClient } from '../utility/AxiosClient'

const topStoriesPath = 'topstories.json?print=pretty'
const storyDetailPath = (id: number) => `item/${id}.json?print=pretty`

export async function getStoryIds(client: IAxiosClient): Promise<StoryIds> {
  const data = await client.get<StoryIds>(`/${topStoriesPath}`)
  return data
}

export async function getStoryDetails(
  client: IAxiosClient,
  id: number,
): Promise<StoryDetail> {
  const data = await client.get<StoryDetail>(`/${storyDetailPath(id)}`)
  return data
}

export async function getStoryList(
  client: IAxiosClient,
): Promise<StoryDetail[]> {
  const storyIds = await getStoryIds(client)
  const storyDetailsPromises = storyIds.map((id) => getStoryDetails(client, id))
  const stories = await Promise.all(storyDetailsPromises)
  return stories
}
