import { Button, CircularProgress, Grid, List, ListItem } from '@mui/material'
import { StoryDetail } from '../../types/types'
import HackerNewsPageListItem from '../HackerNewsPageListItem/HackerNewsPageListItem'
import { useState } from 'react'
import ListSkeleton from '../shared/ListSkeleton/ListSkeleton'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  button: {
    color: 'gray !important',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
})
type Props = {
  data: StoryDetail[]
  isLoading: boolean
}

const hackerNewsPageListPrefix = 'HackerNewsPageList_'

const HackerNewsPageList = ({ data, isLoading }: Props) => {
  const classes = useStyles()
  const [showData, setShowData] = useState<number>(10)
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false)

  const loadMore = async () => {
    setIsLoadMore(true)
    // Simulate a network request or delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowData((prev) => prev + 10)
    setIsLoadMore(false)
  }

  return (
    <Grid container data-testid={`${hackerNewsPageListPrefix}_container`}>
      <Grid item xs={12}>
        <List data-testid={`${hackerNewsPageListPrefix}_list`}>
          {isLoading ? (
            <Grid item data-testid={`${hackerNewsPageListPrefix}_skeleton`}>
              <ListSkeleton />
            </Grid>
          ) : (
            <>
              {data.slice(0, showData).map((item, index) => (
                <ListItem
                  alignItems="flex-start"
                  key={item.id}
                  data-testid={`${hackerNewsPageListPrefix}_item-${item.id}`}
                >
                  <HackerNewsPageListItem
                    id={item.id}
                    title={item.title}
                    score={item.score}
                    by={item.by}
                    time={item.time}
                    comments={item.kids?.length}
                    url={item.url}
                    index={index + 1}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Grid>
      {!isLoading && (
        <Grid item xs display="flex" justifyContent="center">
          {isLoadMore ? (
            <Grid item className={classes.progress}>
              <CircularProgress />
            </Grid>
          ) : (
            <Button
              className={classes.button}
              onClick={loadMore}
              data-testid={`${hackerNewsPageListPrefix}_loadMoreButton`}
            >
              {'Load More'}
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default HackerNewsPageList
