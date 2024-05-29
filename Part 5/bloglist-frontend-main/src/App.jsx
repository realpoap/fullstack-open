import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('')

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

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
      setErrorMessage('Successfully logged in')
      setErrorType('success')
      setTimeout(() => {
        setErrorMessage('')
        setErrorType('')
      }, 5000)
    }
    catch (exception) {
      console.log('error loggin in')
      setErrorMessage('Wrong credentials')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage('')
        setErrorType('')
      }, 5000)
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
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        setErrorMessage(`New blog "${title}" added !`)
        setErrorType('success')
        setTimeout(() => {
          setErrorMessage('')
          setErrorType('')
        }, 5000)

        setAuthor('')
        setTitle('')
        setUrl('')
      })

  }

  return (
    <div>
      <Notification message={errorMessage} type={errorType} />

      {!user && <div>
        <Togglable buttonLabel={'Log in'}>

          <LoginForm
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
        </Togglable>



      </div>}


      {user && <div>
        <h1>Blogs</h1>
        <div>
          <p>{user.name} is logged in</p>
          <button type='text' name='logout' onClick={handleLogout}>logout</button>
        </div>

        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm
            createNew={createNew}
            author={author}
            title={title}
            url={url}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
          />
        </Togglable>

      </div>
      }

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