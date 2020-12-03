import { Theme, createStyles, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

export const ContentContainer = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 600,
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
)(Paper)
