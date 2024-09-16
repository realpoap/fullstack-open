import { useState, useEffect, createRef, useReducer } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getBlogs, createBlog, updateBlog, deleteBlog } from './services/requests'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'



const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}



const App = () => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(null)
  // const [notification, setNotification] = useState(null)

  const [notification, notificationDispatch] = useReducer(notifyReducer, null)

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  //console.log('blogs after query', JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>Data loading...</div>
  }

  const blogs = result.data


  const blogFormRef = createRef()

  const notify = (message, type = 'success') => {
    const messageObject = {
      message: message,
      type: type
    }
    notificationDispatch({ type: 'SET', payload: messageObject })
    console.log('Notification', notification)

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
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
    newBlogMutation.mutate({ ...blog, likes: 0 })
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = async (blog) => {
    console.log('updating blog with id:', blog.id)
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlogMutation.mutate(likedBlog)
    notify(`You liked ${blog.title} by ${blog.author}`)

  }

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog)
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