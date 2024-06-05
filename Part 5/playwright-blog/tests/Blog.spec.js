const { test, expect, beforeEach, describe } = require('@playwright/test')

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
			await page.getByTestId('username').fill('poap')
			await page.getByTestId('password').fill('root')
			await page.getByRole('button', { name: 'login' }).click()

			await expect(page.getByText('root is logged in')).toBeVisible()
		})

		test('fails with incorrect creds', async ({ page }) => {
			await page.getByTestId('username').fill('poap')
			await page.getByTestId('password').fill('wrong')
			await page.getByRole('button', { name: 'login' }).click()

			await expect(page.getByText('wrong credentials')).toBeVisible()
		})
	})
})
