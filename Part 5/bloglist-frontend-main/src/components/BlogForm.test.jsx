import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('blogForm creates the blog', async () => {
	const addBlog = vi.fn()
	const user = userEvent.setup()

	const { container } = render(<BlogForm createBlog={addBlog} />)


	const author = container.querySelector('#author-input')
	const title = container.querySelector('#title-input')
	const url = container.querySelector('#url-input')
	const submitBtn = screen.getByText('Create')

	await user.type(author, 'poap')
	await user.type(title, 'testing with vitest')
	await user.type(url, 'fullstackopen')
	await user.click(submitBtn)

	expect(addBlog.mock.calls).toHaveLength(1)
	//console.log(addBlog.mock.calls[0][0])
	expect(addBlog.mock.calls[0][0].title).toBe('testing with vitest')


})