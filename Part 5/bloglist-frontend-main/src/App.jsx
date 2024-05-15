import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('error loggin in');
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
  }

  const createNew = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    blogService
      .create(blogObject)
      .then(returnedObject => {
        console.log('returned');
        setBlogs(blogs.concat(returnedObject))

        setAuthor('')
        setTitle('')
        setUrl('')
      })
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
        <p>{user.name} is logged in</p>
        <button type='text' name='logout' onClick={handleLogout}>logout</button>
      </div>

      <div>
        <h2>Create new blog</h2>
        <form onSubmit={createNew}>
          <div>
            <p>Author : </p>
            <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            <p>Title : </p>
            <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            <p>Url : </p>
            <input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type='submit'>Create</button>
        </form>
      </div>

      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App