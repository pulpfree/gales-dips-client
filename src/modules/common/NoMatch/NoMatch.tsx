import { useLocation } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { ContentContainer } from '../../Components/ContentContainer'

export const NoMatch = () => {
  let location = useLocation()

  return (
    <ContentContainer>
      <Typography gutterBottom variant='h6'>
        No match for '<code>{location.pathname}</code>'
      </Typography>
      <Typography variant='body1'>
        Please check your records or contact support
      </Typography>
    </ContentContainer>
  )
}
