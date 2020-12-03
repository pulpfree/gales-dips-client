import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    flex: {
      flex: 1,
    },
    mainContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      margin: 'auto',
    },
    titleLink: {
      textDecoration: 'none',
      color: '#fff',
    },
    paper: {
      minHeight: 600,
      // minWidth: 275,
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    popperClose: {
      pointerEvents: 'none',
      zIndex: -1,
    },
  })
)

export default useStyles