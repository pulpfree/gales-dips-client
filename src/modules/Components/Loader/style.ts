
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      // left: theme.spacing.unit * 10,
    },
    progress: {
      margin: theme.spacing(2),
    },
  })
)