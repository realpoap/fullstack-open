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
		await request.post('/api/users', {
			data: {
				name: 'admin',
				username: 'admin',
				password: 'admin'
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

		test('delete button is not showned if you are not the owner', async ({ page }) => {
			await loginWith(page, 'admin', 'admin')
			await createBlog(page, 'Robin Hobbs', `City of Dragon`, 'www.books.net')
			await page.getByRole('button', { name: 'logout' }).click()
			await page.getByRole('button', { name: 'login' }).waitFor()

			await loginWith(page, 'poap', 'root')

			await page.getByRole('button', { name: 'view' }).waitFor()
			await page.getByRole('button', { name: 'view' }).click();

			await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

		})

		test('the blogs are sorted', async ({ page }) => {
			await loginWith(page, 'poap', 'root')

			await createBlog(page, 'Robin Hobbs', 'Royal Assassin', 'www.books.net')
			await createBlog(page, 'Robin Hobbs', `City of Dragon`, 'www.books.net')

			//await page.reload();


			const lastDiv = await page.locator('div.blogdiv').last()

			await lastDiv.getByRole('button', { name: 'view' }).waitFor();
			await lastDiv.getByRole('button', { name: 'view' }).click();

			await lastDiv.getByRole('button', { name: 'Like' }).click();
			await lastDiv.getByText('Likes : 1').waitFor()

			const firstDiv = await page.locator('div.blogdiv').first()
			await expect(firstDiv.getByText('City of Dragon')).toBeVisible()


		})
	})
})
