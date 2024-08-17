import { Grid, Typography, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { StoryDetail } from '../../types/types'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

interface HackerNewsPageListItemProps extends Omit<StoryDetail, 'kids'> {
  comments: number
  index: number
}

const useStyles = makeStyles({
  container: {
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    margin: 'auto',
  },
  subtext: {
    color: '#828282',
    fontSize: '16px !important',
    display: 'flex',
    '& .MuiTypography-root': {
      textDecorationLine: 'none',
      color: '#828282',
      marginLeft: '4px',
      alignContent: 'center',
      display: 'flex',
    },
  },
})

const hackerNewsPageListItemPrefix = 'HackerNewsPageListItem_'

const HackerNewsPageListItem = ({
  title,
  score,
  by: author,
  time,
  comments,
  url,
  index,
}: HackerNewsPageListItemProps) => {
  const classes = useStyles()

  // Convert the time to hours format
  const timeAgo = (time: number) => {
    const hours = Math.floor((Date.now() - time * 1000) / 3600000)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  }

  // Format the URL as per the requirement
  const formatUrl = (url: string) => {
    if (!url) return 'N/A'
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.replace(/^www\./, '') // Remove 'www' if it exists
    if (hostname === 'github.com') {
      const pathParts = parsedUrl.pathname.split('/').filter(Boolean)
      return `github.com/${pathParts[0]}`
    }
    return hostname
  }

  return (
    <Grid
      container
      className={classes.container}
      wrap="nowrap"
      data-testid={`${hackerNewsPageListItemPrefix}_item-${index}`}
    >
      <Grid item display="flex">
        <Typography sx={{ color: 'gray' }}>{index}.</Typography>
        <ThumbUpIcon
          sx={{
            color: 'gray',
            fontSize: '15px',
            mx: '2px',
            height: '22px',
          }}
        />
      </Grid>
      <Grid item>
        <Typography>
          <Link
            href={''}
            sx={{
              textDecorationLine: 'none',
              color: 'black',
              marginRight: '2px',
            }}
            data-testid={`${hackerNewsPageListItemPrefix}_itemTitle-${index}`}
          >
            {title}
          </Link>
          <Link
            sx={{
              fontSize: '16px',
              color: '#828282',
              textDecorationLine: 'none',
            }}
            href={''}
            data-testid={`${hackerNewsPageListItemPrefix}_itemUrl-${index}`}
          >
            ({formatUrl(url)})
          </Link>
        </Typography>
        <Typography className={classes.subtext}>
          {`${score} points`}
          <Link href={''} sx={{ marginRight: '5px' }}>{`by ${author}`}</Link>
          <span
            data-testid={`${hackerNewsPageListItemPrefix}_hourAgo-${index}`}
          >{`${timeAgo(time)}`}</span>
        </Typography>
        <Typography className={classes.subtext}>
          <Link href={''}>{'hide'}</Link>
          {comments > 0 && (
            <Link
              href={''}
              data-testid={`${hackerNewsPageListItemPrefix}_itemComments-${index}`}
            >{`| ${comments} comments`}</Link>
          )}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default HackerNewsPageListItem
