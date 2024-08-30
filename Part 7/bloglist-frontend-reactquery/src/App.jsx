import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const blogFormRef = createRef()

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App