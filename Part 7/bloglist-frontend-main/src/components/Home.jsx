import { useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import { Typography } from '@mui/material'

const Home = ({ blogFormRef, handleVote, handleDelete, handleCreate, handlePostComment }) => {
	const blogs = useSelector(state => state.blogs)
	return (
		<div>
			<Typography variant='h4'>Blogs List</Typography>
			<Togglable buttonLabel='create new blog' ref={blogFormRef}>
				<NewBlog doCreate={handleCreate} />
			</Togglable>
			<ul>
				{
					[...blogs].map(blog =>
						<li key={blog.id}><Blog
							blog={blog}
							handleVote={handleVote}
							handleDelete={handleDelete}
							handlePostComment={handlePostComment}
						/></li>
					)
				}
			</ul>

		</div>
	)

}

export default Home