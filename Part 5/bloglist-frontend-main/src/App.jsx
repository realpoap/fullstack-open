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

  const [sortedBlogs, setSortedBlogs] = useState([])


  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const sortBlogs = () => {
    console.log('sorting blogs...')
    // setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes))
    // setBlogs(sortedBlogs)
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
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
      setErrorMessage('wrong credentials')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage('')
        setErrorType('')
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
  }

  const createNew = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        setErrorMessage(`New blog "${blogObject.title}" added !`)
        setErrorType('success')
        setTimeout(() => {
          setErrorMessage('')
          setErrorType('')
        }, 3000)
      })
  }

  const deleteBlog = async (blog) => {
    console.log('deleting ?')
    if (window.confirm(`delete post ${blog.title} by ${blog.author} ?`))
      await blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id === blog.id))
          setErrorMessage(`Deleted blog "${blog.title}" !`)
          setErrorType('success')
          setTimeout(() => {
            setErrorMessage('')
            setErrorType('')
          }, 3000)
        })

    sortBlogs()
  }


  return (
    <div>
      <Notification message={errorMessage} type={errorType} />

      {!user && <div>

        <LoginForm
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />



      </div>}


      {user && <div>
        <h1>Blogs</h1>
        <div>
          <p>{user.name} is logged in</p>
          <button type='text' name='logout' onClick={handleLogout}>logout</button>
        </div>

        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm
            createBlog={createNew}
          />
        </Togglable>

      </div>
      }

      <div>
        <h2>Blogs</h2>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} sortBlogs={sortBlogs} user={user} />
          )
        }
      </div>


    </div>
  )
}

export default App