
import { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useParams, useMatch } from 'react-router-dom'
import { Typography, Button, AppBar, Container, Toolbar } from '@mui/material'

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
import { createBlog, deleteBlog, initializeBlogs, updateBlog, createComment } from './reducers/blogsReducer'
import { saveUser, forgetUser } from './reducers/usersReducer'



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

	const userMatch = useMatch('/users/:id')

	const user = userMatch
		? userList.find((u) => String(u.id) === String(userMatch.params.id))
		: null

	console.log({ userMatch, userList, user })

	const blogMatch = useMatch('/blogs/:id')

	const blog = blogMatch
		? blogs.find((u) => String(u.id) === String(blogMatch.params.id))
		: null

	console.log({ blogMatch, blogs, user })


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
		notify(`Blog created: ${blog.title}, ${blog.author}`, 'info')
		blogFormRef.current.toggleVisibility()
	}

	const handleVote = async (blog) => {
		console.log('updating', blog)
		const newBlog = {
			...blog,
			likes: blog.likes + 1
		}
		dispatch(updateBlog(newBlog))
		notify(`You liked ${newBlog.title} by ${newBlog.author}`, 'info')
	}


	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog))
			notify(`Blog ${blog.title}, by ${blog.author} removed`)
		}
	}

	const handlePostComment = async (id, content) => {
		console.log('POST COMMENT content : ', content)

		dispatch(createComment(id, content))
		notify(`Comment added : ${content}`, 'info')
	}


	if (!users) {
		return (

			<Container>
				<div>
					<Typography variant="h3">Blogs</Typography>
					<Notification notification={notification} />
					<Login doLogin={handleLogin} />
				</div>
			</Container>
		)
	}

	return (
		<Container >
			<AppBar position='static' color='primary'>
				<Toolbar>
					<Button color='disabled' component={Link} to="/">Home</Button>
					<Button color='disabled' component={Link} to="/users">Users</Button>
					<Typography variant='button'>
						{users.name} logged in
					</Typography>
					<Button color='disabled' onClick={handleLogout}>Logout</Button>
				</Toolbar>
			</AppBar>

			<div>
				<Typography variant="h3">Blogs</Typography>
				<Notification notification={notification} />

				<Routes>
					<Route path="/users/:id" element={<User user={user} />} />
					<Route path="/blogs/:id" element={<Blog
						blog={blog}
						handleVote={handleVote}
						handleDelete={handleDelete}
					/>} />
					<Route path="/users" element={<Users users={userList} />} />
					<Route path="/" element={<Home
						blogFormRef={blogFormRef}
						handleCreate={handleCreate}
						handleVote={handleVote}
						handleDelete={handleDelete}
						handlePostComment={handlePostComment}
					/>} />
				</Routes>
			</div>
		</Container>
	)
}


export default App