import { Grid, Typography } from '@mui/material'
import { StoryDetail } from '../types/types'
import HackerNewsPageHeader from '../components/HackerNewsPageHeader/HackerNewsPageHeader'
import HackerNewsPageContent from '../components/HackerNewsPageList/HackerNewsPageList'
import HackerNewsPageFooter from '../components/HackerNewsPageFooter/HackerNewsPageFooter'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    paddingTop: '70px',
    height: '100%',
    width: '100%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: '20px 0',
  },
})

type Props = {
  data: StoryDetail[]
  isLoading: boolean
  errorMessage: string | null
}

const HackerNewsPage = ({ data, isLoading, errorMessage }: Props) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction="column">
      <Grid item>
        <HackerNewsPageHeader />
      </Grid>
      <Grid item xs>
        {errorMessage ? (
          <Typography
            className={classes.error}
            data-testid={'HackerNewsPage__error'}
          >
            {errorMessage}
          </Typography>
        ) : (
          <HackerNewsPageContent data={data} isLoading={isLoading} />
        )}
      </Grid>
      {!isLoading && !errorMessage && (
        <Grid item>
          <HackerNewsPageFooter />
        </Grid>
      )}
    </Grid>
  )
}

export default HackerNewsPage
