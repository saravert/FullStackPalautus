import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect, test, vi } from 'vitest'

test('calls addBlog with right details when a new blog is created', async () => {
    const newBlog = vi.fn()
    render(<BlogForm addBlog={newBlog} />)
    const user = userEvent.setup()

    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('URL')
    const sendButton = screen.getByText('create')

    await user.type(title, 'testing a form...')
    await user.type(author, 'John Doe')
    await user.type(url, 'https://example.com')
    await user.click(sendButton)
    
    expect(newBlog).toHaveBeenCalledTimes(1)
    expect(newBlog).toHaveBeenCalledWith({
        title: 'testing a form...',
        author: 'John Doe',
        url: 'https://example.com',
        likes: 0})
    })