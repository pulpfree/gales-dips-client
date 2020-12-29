import React from 'react'

import { useLocation } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { ContentContainer } from '../ContentContainer'

export const NoMatch = (): JSX.Element => {
  const location = useLocation()

  return (
    <ContentContainer>
      <Typography gutterBottom variant='h6'>
        No match for &apos;<code>{location.pathname}</code>&apos;
      </Typography>
      <Typography variant='body1'>Please check your records or contact support</Typography>
    </ContentContainer>
  )
}
