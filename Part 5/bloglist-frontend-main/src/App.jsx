import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('error loggin in');
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <input type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>User</h2>
        <p>{user.name}</p>
      </div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App