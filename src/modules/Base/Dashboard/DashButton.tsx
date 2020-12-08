import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { LinkItem } from '../types'

export const DashButton = ({ label, path }: LinkItem) => {
  return (
    <Grid item>
      <Button component={Link} to={path}>
        {label}
      </Button>
    </Grid>
  )
}
