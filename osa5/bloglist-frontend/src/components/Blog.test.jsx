import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 0,
    user: {
      name: 'Jane Doe',
      username: 'janedoe'
    }
  }

  render(<Blog blog={blog} />)

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
    render(<Blog blog={blog} user={mockUser}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const url = screen.getByText('https://example.com')
    expect(url).toBeDefined()
    const likes = screen.getByText('0 likes')
    expect(likes).toBeDefined()
    const userName = screen.getByText('Jane Doe')
    expect(userName).toBeDefined()
})
