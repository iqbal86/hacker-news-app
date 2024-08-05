import { Grid, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  footerContainer: {
    textAlign: 'center',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  footerLinks: {
    '& a': {
      color: '#ff6600',
      textDecoration: 'none',
      margin: '0 5px',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  searchFormGrid: {
    marginTop: '10px !important',
    width: '100%',
  },
  searchLabel: {
    marginRight: '5px !important',
  },

  searchForm: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    border: '1px solid #ddd',
    padding: '5px',
    fontSize: '14px',
    width: '100%',
  },
})

const HackerNewsPageFooter = () => {
  const classes = useStyles()

  return (
    <Grid container alignItems="center" className={classes.footerContainer}>
      <Grid item xs={12} className={classes.footerLinks}>
        <Link href="newsguidelines.html">Guidelines</Link> |
        <Link href="newsfaq.html">FAQ</Link> |<Link href="lists">Lists</Link> |
        <Link href="https://github.com/HackerNews/API">API</Link> |
        <Link href="security.html">Security</Link> |
        <Link href="https://www.ycombinator.com/legal/">Legal</Link> |
        <Link href="https://www.ycombinator.com/apply/">Apply to YC</Link> |
        <Link href="mailto:hn@ycombinator.com">Contact</Link>
      </Grid>
      <Grid item xs sm={6} md={4} className={classes.searchFormGrid}>
        <form
          method="get"
          action="//hn.algolia.com/"
          className={classes.searchForm}
        >
          <Typography className={classes.searchLabel}>Search:</Typography>
          <input type="text" className={classes.searchInput} />
        </form>
      </Grid>
    </Grid>
  )
}

export default HackerNewsPageFooter
