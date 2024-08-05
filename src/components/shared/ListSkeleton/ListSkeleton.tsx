import { Grid, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  item: {
    width: '100%',
  },
}))

const loading = 'ListSkeleton_'

const ListSkeleton = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      data-testid={`${loading}_container`}
      direction="column"
    >
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
      <Grid item xs className={classes.item}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>
    </Grid>
  )
}

export default ListSkeleton
