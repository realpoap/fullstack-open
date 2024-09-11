import { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useParams, useMatch } from 'react-router-dom'

import loginService from './services/login'
import userService from './services/users'
import storage from './services/storage'
import Login from './components/Login'
import Users from './components/Users'
import Home from './components/Home'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { setNotif, clearNotif } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogsReducer'
import { saveUser, forgetUser } from './reducers/usersReducer'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const [userList, setUserList] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      dispatch(saveUser(user))
    }
  }, [dispatch])

  useEffect(() => {
    userService.getAll()
      .then(users => {
        setUserList(users)
        console.log('Defining UserList:', users) // Verify the structure and content of userList
      })
      .catch(error => console.error('Error fetching users:', error))
  }, [])



  const blogFormRef = createRef()

  const notify = (message, type = 'success') => {
    dispatch(setNotif({ message, type }))
    setTimeout(() => {
      dispatch(clearNotif())
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(saveUser(user))
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = async (blog) => {
    console.log('updating', blog)
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(newBlog))
    notify(`You liked ${newBlog.title} by ${newBlog.author}`)
  }



  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  if (!users) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    )
  }


  return (
    <div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/users'>Users</Link>
      </div>

      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <div>
          {users.name} logged in
          <button onClick={handleLogout}>
            logout
          </button>
        </div>
        <Routes>
          <Route path='/users/:id' element={<User user={ } />} />
          {/* <Route path='/blog/:id' element={

            <Blog
              key={b.id}
              blog={b}
              handleVote={handleVote}
              handleDelete={handleDelete}
            />} /> */}
          <Route path='/users' element={<Users users={userList} />} />
          <Route path='/' element={<Home />} />
        </Routes>

      </div>
    </div>
  )
}

export default App