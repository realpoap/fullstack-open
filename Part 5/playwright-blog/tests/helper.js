const loginWith = async (page, username, password) => {
	await page.getByTestId('username').fill(username)
	await page.getByTestId('password').fill(password)
	await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, author, title, url) => {
	await page.getByRole('button', { name: 'new blog' }).waitFor()

	await page.getByRole('button', { name: 'new blog' }).click()
	await page.locator('#author-input').fill(author)
	await page.locator('#title-input').fill(title)
	await page.locator('#url-input').fill(url)

	await page.getByRole('button', { name: 'Create' }).click()
	await page.getByRole('button', { name: 'new blog' }).waitFor()

	await page.getByText(`${title}, by ${author}`).waitFor()
}

export { loginWith, createBlog }