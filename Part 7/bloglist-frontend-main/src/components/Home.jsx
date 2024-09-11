import Togglable from './Togglable'

const Home = () => {
	return (
		<div>
			Home view
		</div>
	)
		< Togglable Togglable buttonLabel = 'create new blog' ref = { blogFormRef } >
			<NewBlog doCreate={handleCreate} />
	</ >
{
	[...blogs].sort(byLikes).map(blog =>
		<Blog
			key={blog.id}
			blog={blog}
			handleVote={handleVote}
			handleDelete={handleDelete}
		/>
	)
}
}

export default Home