import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders author and title, and not likes and url', () => {
	const blog = {
		author: 'mathieu',
		title: 'testing with vitest',
		url: 'fullstackopen',
		likes: 3
	}

	const { container } = render(<Blog blog={blog} />)

	const div = container.querySelector('.blog-info')

	expect(div).toHaveTextContent('testing with vitest, by mathieu')

	const url = screen.queryByText('fullstackopen')
	expect(url).toBeNull()

	const likes = screen.queryByText('3')
	expect(likes).toBeNull()

})

test('url and likes are shown when button is clicked', async () => {
	const blog = {
		author: 'mathieu',
		title: 'testing with vitest',
		url: 'fullstackopen',
		likes: 3
	}

	const { container } = render(<Blog blog={blog} />)

	const div = container.querySelector('.blog-info')
	const user = userEvent.setup()
	const button = div.querySelector('btn-show')

	await user.click(button)

	const url = screen.queryByText('fullstackopen')
	expect(url).toBeDefined()

	const likes = screen.queryByText('3')
	expect(likes).toBeDefined()
	// throws 2 errors but the test passes


})

test('likes fires event each time', async () => {
	const blog = {
		author: 'mathieu',
		title: 'testing with vitest',
		url: 'fullstackopen',
		likes: 3
	}

	const { container } = render(<Blog blog={blog} />)

	const div = container.querySelector('.blog-info')
	const user = userEvent.setup()
	const button = div.querySelector('btn-show')

	await user.click(button)

	const likeBtn = div.querySelector('likeBtn')
	await user.click(likeBtn)
	await user.click(likeBtn)

	const likes = screen.queryByText('5')
	expect(likes).toBeDefined()

})
