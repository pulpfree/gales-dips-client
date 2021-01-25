import React from 'react'

interface ErrorProps {
  error: Error
}

export const ErrorFallback = ({ error }: ErrorProps): JSX.Element => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}
