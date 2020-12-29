import React from 'react'

import { Divider, Typography } from '@material-ui/core'

interface PageTitleProps {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps): JSX.Element => (
  <>
    <Typography gutterBottom variant='h5'>
      {title}
    </Typography>
    <Divider light />
    <br />
  </>
)
