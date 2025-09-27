import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} placeholder="Title" />
      </div>
      <div>
        <label>Author</label>
        <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} placeholder="Author" />
      </div>
      <div>
        <label>URL</label>
        <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} placeholder="URL" />
      </div>
      <button type="submit">create</button>
    </form>
  )}

export default BlogForm