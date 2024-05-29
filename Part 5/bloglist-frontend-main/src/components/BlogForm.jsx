const BlogForm = ({
	createNew,
	author,
	title,
	url,
	handleAuthorChange,
	handleTitleChange,
	handleUrlChange,
}) => {
	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={createNew}>
				<div>
					<p>Author : </p>
					<input type='text' value={author} name='Author' onChange={handleAuthorChange} />
				</div>
				<div>
					<p>Title : </p>
					<input type='text' value={title} name='Title' onChange={handleTitleChange} />
				</div>
				<div>
					<p>Url : </p>
					<input type='text' value={url} name='Url' onChange={handleUrlChange} />
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default BlogForm