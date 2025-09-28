import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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
