import { Alert } from '@mantine/core'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const { message, type } = notification

  const color = type === 'success' ? 'green' : 'red'


  return (
    <Alert color={color} variant='light' withCloseButton>
      {message}
    </Alert>
  )
}

export default Notification