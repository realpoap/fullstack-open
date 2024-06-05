const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog App', () => {

	beforeEach(async ({ page }) => {
		await page.goto('http://localhost:5173')
	})

	test('login form is visible by default', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
	})
})
