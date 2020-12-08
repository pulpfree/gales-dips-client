import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      fontFamily: theme.typography.fontFamily,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    titleLink: {
      textDecoration: 'none',
      color: '#fff',
    },
    userMenu: {
      flexGrow: 1,
      textAlign: 'right',
    },
  })
)
