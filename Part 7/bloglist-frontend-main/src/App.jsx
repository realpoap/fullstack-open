
import { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useParams, useMatch } from 'react-router-dom'

import loginService from './services/login'
import userService from './services/users'
import storage from './services/storage'

import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'


import { setNotif, clearNotif } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogsReducer'
import { saveUser, forgetUser } from './reducers/usersReducer'


export default function App() {
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

	const match = useMatch('/users/:id')

	const user = match
		? userList.find((u) => String(u.id) === String(match.params.id))
		: null

	console.log({ match, userList, user })


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

	const handleLogout = () => {
		notify(`Bye, ${users.name}!`)
		dispatch(forgetUser())
		storage.removeUser()
		console.log('byby user, now notifying...')
	}

	const handleCreate = async (blog) => {
		dispatch(createBlog(blog))
		notify(`Blog created: ${blog.title}, ${blog.author}`)
		blogFormRef.current.toggleVisibility()
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
				<Link to="/">Home</Link>
				<Link to="/users">Users</Link>
			</div>

			<div>
				<h2>blogs</h2>
				<Notification notification={notification} />
				<div>
					{users.name} logged in
					<button onClick={handleLogout}>logout</button>
				</div>
				<Routes>
					<Route path="/users/:id" element={<User user={user} />} />
					<Route path="/users" element={<Users users={userList} />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</div>
	)
}
