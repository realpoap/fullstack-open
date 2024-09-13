import { Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const NewBlog = ({ doCreate }) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		doCreate({ title, url, author })
		setAuthor('')
		setTitle('')
		setUrl('')
	}

	return (
		<div>
			<Typography variant='h6'>Create a New Blog</Typography>
			<form onSubmit={handleSubmit}>
				<div>
					<FormLabel>Title:</FormLabel>
					<TextField
						type="text"
						data-testid='title'
						value={title}
						size='small'
						variant='standard'
						onChange={handleTitleChange}
					/>
				</div>
				<div>
					<FormLabel>URL:</FormLabel>
					<TextField
						type="text"
						data-testid='url'
						value={url}
						size='small'
						variant='standard'
						onChange={handleUrlChange}
					/>
				</div>
				<div>
					<FormLabel>Author:</FormLabel>
					<TextField
						type="text"
						data-testid='author'
						value={author}
						size='small'
						variant='standard'
						onChange={handleAuthorChange}
					/>
				</div>
				<Button variant='contained' type="submit">Create</Button>
			</form>
		</div>
	)
}

export default NewBlog