import { StoryDetail } from '../../types/types'

export function generateMockStories(quantity: number): StoryDetail[] {
  const stories = []
  for (let i = 0; i < quantity; i++) {
    stories.push({
      by: `USER_${i + 1}`,
      descendants: 20 + i * 10,
      id: 41144827 + i,
      kids: [41145985 + i, 41145433 + i],
      score: 120 + i * 10,
      time: 1722662460 + i * 10,
      title: `TITLE_${i + 1}`,
      type: 'story',
      url: `https://github.com/piano-${i + 1}`,
    })
  }
  return stories
}
