import { TextInput, Button } from '@mantine/core'
import { useState } from 'react'

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <TextInput
        type="text"
        data-testid='username'
        value={username}
        label='Username'
        onChange={(e) => setUsername(e.target.value)}
        mb="md" />

      <TextInput
        type="password"
        value={password}
        label='Password'
        data-testid='password'
        onChange={(e) => setPassword(e.target.value)}
        mb="md" />
      <Button type="submit" value="Login">Login</Button>
    </form>
  )
}

export default Login