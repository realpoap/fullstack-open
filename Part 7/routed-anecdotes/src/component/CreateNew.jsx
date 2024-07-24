import { useNavigate } from "react-router-dom"

import { useField } from "../hooks"

const CreateNew = ({ addNew, setNotification }) => {
	const { reset: resetContent, ...contentField } = useField('text')
	const { reset: resetAuthor, ...authorField } = useField('text')
	const { reset: resetInfo, ...infoField } = useField('text')

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		const content = contentField.value
		const author = authorField.value
		const info = infoField.value

		addNew({
			content,
			author,
			info,
			votes: 0
		})
		navigate('/')
		setNotification(`Anecdote from author ${author} added !`)
		setTimeout(() => {
			setNotification('')
		}, 5000)
	}

	const resetFields = (e) => {
		e.preventDefault()
		resetContent()
		resetAuthor()
		resetInfo()
	}

	return (
		<div>
			<h2>Create a new anecdote</h2>
			<form onSubmit={handleSubmit}>

				content
				<input {...contentField} />
				<br />
				author
				<input {...authorField} />
				<br />
				url for more info
				< input {...infoField} />
				<br />
				<button>create</button>
				<button onClick={resetFields}>reset</button>
			</form >
		</div >
	)

}

export default CreateNew