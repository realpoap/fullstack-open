import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const { message, type } = notification

  return (
    <Alert severity={type}>
      {message}
    </Alert>
  )
}

export default Notification