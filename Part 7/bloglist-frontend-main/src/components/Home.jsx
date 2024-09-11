import { useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'

const Home = ({ blogFormRef, handleVote, handleDelete, handleCreate }) => {
	const blogs = useSelector(state => state.blogs)
	return (
		<div>
			<Togglable buttonLabel='create new blog' ref={blogFormRef}>
				<NewBlog doCreate={handleCreate} />
			</Togglable>
			{
				[...blogs].map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						handleVote={handleVote}
						handleDelete={handleDelete}
					/>
				)
			}
		</div>
	)

}

export default Home