import { render, screen } from '@testing-library/react'

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
	screen.debug(div)

	expect(div).toHaveTextContent('testing with vitest, by mathieu')

	const url = screen.queryByText('fullstackopen')
	expect(url).toBeNull()

	const likes = screen.queryByText('3')
	expect(likes).toBeNull()

})