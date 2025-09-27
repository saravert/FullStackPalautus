import { useState } from 'react'
const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleView}>{viewing ? 'hide' : 'view'}</button>
      {viewing && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes
          <button onClick={() => console.log('liking', blog.id)}>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog