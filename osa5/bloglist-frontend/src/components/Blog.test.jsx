import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogs from '../services/blogs'
import { expect, test, vi } from 'vitest'

vi.mock('../services/blogs')

test('renders content', () => {
  const blog = {
    id: '12345',
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 0,
    user: {
      name: 'Jane Doe',
      username: 'janedoe'
    }
  }

  render(<Blog blog={blog} updateBlogInState={() => {}} deleteBlogInState={() => {}} />)

  const title = screen.getByText('Component testing is done with react-testing-library')
  expect(title).toBeDefined()
  const author = screen.getByText('John Doe')
  expect(author).toBeDefined()
  const url = screen.queryByText('https://example.com')
  expect(url).toBeNull()
  const likes = screen.queryByText('0 likes')
  expect(likes).toBeNull()
})

test('shows url and likes when view button is clicked', async () => {
  const blog = {
    id: '12345',
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 0,
    user: {
      name: 'Jane Doe',
      username: 'janedoe'
    }
  }

  const mockUser = {
    name: 'Jane Doe',
    username: 'janedoe'
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} user={mockUser} updateBlogInState={mockHandler} deleteBlogInState={() => {}} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const url = screen.getByText('https://example.com')
  expect(url).toBeDefined()
  const likes = screen.getByTestId('likes-count')
  expect(likes).toHaveTextContent('0')
  const userName = screen.getByText('Jane Doe')
  expect(userName).toBeDefined()
})

test('like button calls event handler twice when clicked twice', async () => {
  const blog = {
    id: '12345',
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 0,
    user: {
      name: 'Jane Doe',
      username: 'janedoe'
    }
  }

  const mockUser = {
    name: 'Jane Doe',
    username: 'janedoe'
  }

  const mockUpdateBlogInState = vi.fn()
  blogs.updateLikes.mockResolvedValue({ ...blog, likes: blog.likes + 1 })
  render(<Blog blog={blog} user={mockUser} updateBlogInState={mockUpdateBlogInState} deleteBlogInState={() => {}} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockUpdateBlogInState).toHaveBeenCalledTimes(2)
})
