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

    await expect(page.getByTestId('user-greeting')).toBeVisible({ timeout: 5000 })
  })  
  test('A blog can be created', async ({ page }) => {
    const createBlog = async (title, author, url) => {
      await page.getByRole('button', { name: /create new blog/i }).click()
      await page.getByPlaceholder('Title').fill(title)
      await page.getByPlaceholder('Author').fill(author)
      await page.getByPlaceholder('URL').fill(url)
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText(`${title} ${author}`, { exact: false }).waitFor({ timeout: 5000 })

    }

    await createBlog('a blog created by playwright', 'mluukkai', 'http://example.com')

    const blog = page.locator('.blog').filter({ hasText: 'a blog created by playwright' })
    await expect(blog).toBeVisible()
    await expect(blog).toContainText('a blog created by playwright')
    await expect(blog).toContainText('mluukkai')
  })
  test('A blog can be liked', async ({ page }) => {
  const createBlog = async (title, author, url) => {
    await page.getByRole('button', { name: /create new blog/i }).click()
    await page.getByPlaceholder('Title').fill(title)
    await page.getByPlaceholder('Author').fill(author)
    await page.getByPlaceholder('URL').fill(url)
    await page.getByRole('button', { name: /create/i }).click()
  }

  await createBlog('Blog to like', 'mluukkai', 'http://example.com')

  const blog = page.locator('.blog').filter({ hasText: 'Blog to like' })
  await blog.getByRole('button', { name: /view/i }).click()
  const likesCount = blog.locator('[data-testid="likes-count"]')
  await expect(likesCount).toBeVisible({ timeout: 5000 })
  const likeButton = blog.locator('p.likes').getByRole('button', { name: 'like' })
  const initialLikes = parseInt(await likesCount.textContent() || '0', 10)

  await likeButton.click()

  await expect(likesCount).toHaveText(`${initialLikes + 1}`, { timeout: 10000 })
})

test('A blog can be deleted', async ({ page }) => {
  const createBlog = async (title, author, url) => {
    await page.getByRole('button', { name: /create new blog/i }).click()
    await page.getByPlaceholder('Title').fill(title)
    await page.getByPlaceholder('Author').fill(author)
    await page.getByPlaceholder('URL').fill(url)
    await page.getByRole('button', { name: /create/i }).click()
  }

  await createBlog('Blog to delete', 'mluukkai', 'http://example.com')

  const blog = page.locator('.blog').filter({ hasText: 'Blog to delete' })
  await blog.getByRole('button', { name: /view/i }).click()

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Remove blog Blog to delete by mluukkai')
    await dialog.accept()
  })

  const deleteButton = blog.getByRole('button', { name: /remove/i })
  await expect(deleteButton).toBeVisible({ timeout: 5000 })

  await deleteButton.click()
  await expect(blog).not.toBeVisible({ timeout: 5000 })
})
 test('Deletion is cancelled', async ({ page }) => {
  const createBlog = async (title, author, url) => {
    await page.getByRole('button', { name: /create new blog/i }).click()
    await page.getByPlaceholder('Title').fill(title)
    await page.getByPlaceholder('Author').fill(author)
    await page.getByPlaceholder('URL').fill(url)
    await page.getByRole('button', { name: /create/i }).click()
  } 
  await createBlog('Blog not to delete', 'mluukkai', 'http://example.com')

  const blog = page.locator('.blog').filter({ hasText: 'Blog not to delete' })
  await blog.getByRole('button', { name: /view/i }).click()
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Remove blog Blog not to delete by mluukkai')
    await dialog.dismiss()
  })

  const deleteButton = blog.getByRole('button', { name: /remove/i })
  await expect(deleteButton).toBeVisible({ timeout: 5000 })
  await deleteButton.click()
  await expect(blog).toBeVisible({ timeout: 5000 }) 
})
})
})