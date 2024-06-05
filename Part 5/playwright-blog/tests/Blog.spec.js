const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog App', () => {

	beforeEach(async ({ page, request }) => {
		await request.post('http://localhost:5173/api/testing/reset')
		await request.post('http://localhost:5173/api/users', {
			data: {
				name: 'root',
				username: 'poap',
				password: 'root'
			}
		})
		await page.goto('http://localhost:5173')
	})

	test('login form is visible by default', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
	})


	describe('Login', () => {
		test('succeeds with correct creds', async ({ page }) => {
			await loginWith(page, 'poap', 'root')

			await expect(page.getByText('root is logged in')).toBeVisible()
		})

		test('fails with incorrect creds', async ({ page }) => {
			await loginWith(page, 'poap', 'wrong') //will fail

			await expect(page.getByText('wrong credentials')).toBeVisible()
		})
	})

	describe('When logged in', () => {

		test('a new blog can be created', async ({ page }) => {

			await loginWith(page, 'poap', 'root')
			await createBlog(page, 'Robin Hobbs', 'Royal Assassin', 'www.books.net')
			await expect(page.getByText('New blog "Royal Assassin" added !')).toBeVisible()
			await expect(page.getByText('Royal Assassin, by Robin Hobbs')).toBeVisible()
		})
	})
})
