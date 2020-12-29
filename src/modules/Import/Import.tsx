import React from 'react'

import Button from '@material-ui/core/Button'

import { ContentContainer } from '../Base/ContentContainer'
import { useAlertDispatch } from '../Base/Alert'

export function Import(): JSX.Element {
  const dispatch = useAlertDispatch()

  return (
    <ContentContainer>
      <h2>Import</h2>
      <div>
        <Button variant='outlined' onClick={() => dispatch.send({ message: 'my stupid test', timeout: 1000 })}>
          Open success alert
        </Button>
        <Button
          variant='outlined'
          onClick={() =>
            dispatch.send({
              message:
                'my stupid error message all day long, with a longer sentence displaying who knows what kind of message',
              severity: 'info',
              title: 'Information',
            })
          }
        >
          Open info alert
        </Button>
        <Button
          variant='outlined'
          onClick={() =>
            dispatch.send({
              message: 'error message with false timeout',
              severity: 'error',
              title: 'Big Bad Error',
              setTimeout: false,
            })
          }
        >
          Open error alert freeze
        </Button>
        <Button
          variant='outlined'
          onClick={() =>
            dispatch.send({
              message: 'Warning message with false timeout',
              severity: 'warning',
              title: 'Warning',
              // setTimeout: false,
            })
          }
        >
          Open warning alert
        </Button>
      </div>
    </ContentContainer>
  )
}
