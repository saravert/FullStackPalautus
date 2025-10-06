const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })


describe('Login', () => {
  test('succeeds with correct credentials', async ({ page }) => {
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByTestId('user-greeting')).toHaveText(/Matti Luukkainen logged in/i)
  })
  
  test('fails with wrong credentials', async ({ page }) => {
    await page.getByLabel('username').fill('wrong')
    await page.getByLabel('password').fill('credentials')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('wrong username or password')).toBeVisible()
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
  })  
  test('A blog can be created', async ({ page }) => {
    const createBlog = async (title, author, url) => {
      await page.getByRole('button', { name: /create new blog/i }).click()
      await page.getByPlaceholder('Title').fill(title)
      await page.getByPlaceholder('Author').fill(author)
      await page.getByPlaceholder('URL').fill(url)
      await page.getByRole('button', { name: 'create' }).click()
    }

    await createBlog('a blog created by playwright', 'mluukkai', 'http://example.com')

    const blog = page.locator('.blog').filter({ hasText: 'a blog created by playwright' })
    await expect(blog).toBeVisible()
    await expect(blog).toContainText('a blog created by playwright')
    await expect(blog).toContainText('mluukkai')
  })
})
})