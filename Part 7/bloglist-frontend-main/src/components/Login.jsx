import { Button, FormControl, TextField } from '@mui/material'
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
      <TextField
        required
        label='Username'
        type="text"
        variant='standard'
        data-testid='username'
        margin='none'
        size='small'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        label="Password"
        type="password"
        variant="standard"
        value={password}
        data-testid='password'
        margin='none'
        size='small'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' type='submit' size='small'
      >Login</Button>
    </ form>
  )
}

export default Login