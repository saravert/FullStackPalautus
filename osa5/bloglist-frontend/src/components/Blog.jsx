import { useState } from 'react'
import blogs from '../services/blogs'
const Blog = ({ blog, updateBlogInState, user, deleteBlogInState }) => {
  const [viewing, setViewing] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setViewing(!viewing)
  }

  const handleLikes = async (id) => {
    const updatedBlog = await blogs.updateLikes(id, blog.likes + 1)
    updatedBlog.user = blog.user
    updateBlogInState(updatedBlog)
  }

  const handleDelete = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogs.deleteBlog(id)
      deleteBlogInState(id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleView}>{viewing ? 'hide' : 'view'}</button>
      {viewing && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes
            <button onClick={() => handleLikes(blog.id)}>like</button></p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button onClick={() => handleDelete(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog