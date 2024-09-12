import { useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'

const Home = ({ blogFormRef, handleVote, handleDelete, handleCreate, handlePostComment }) => {
	const blogs = useSelector(state => state.blogs)
	return (
		<div>
			<h1>Blogs List</h1>
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