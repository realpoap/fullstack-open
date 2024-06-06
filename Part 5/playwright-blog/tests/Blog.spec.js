const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog App', () => {

	beforeEach(async ({ page, request }) => {
		await request.post('/api/testing/reset')
		await request.post('/api/users', {
			data: {
				name: 'root',
				username: 'poap',
				password: 'root'
			}
		})
		await page.goto('/')
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

		test('a blog can be liked', async ({ page }) => {
			await loginWith(page, 'poap', 'root')
			await createBlog(page, 'Robin Hobbs', 'Royal Assassin', 'www.books.net')

			//await page.getByText('Royal Assassin, by Robin')
			await page.getByRole('button', { name: 'view' }).waitFor()
			await page.getByRole('button', { name: 'view' }).click()

			await page.getByRole('button', { name: 'Like' }).click()

			await expect(page.getByText('Likes : 1')).toBeVisible()

		})

		test('a blog can be removed', async ({ page }) => {
			await loginWith(page, 'poap', 'root')
			await createBlog(page, 'Robin Hobbs', `Fool's Errand`, 'www.books.net')
			await page.getByRole('button', { name: 'view' }).waitFor()

			await page.getByRole('button', { name: 'view' }).click();

			await page.getByRole('button', { name: 'remove' }).waitFor()
			page.on('dialog', dialog => dialog.accept());
			await page.getByRole('button', { name: 'remove' }).click()

			await expect(page.getByText(`Fool's Errand, by Robin Hobb`)).not.toBeVisible()

		});
	})
})
