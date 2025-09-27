import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

    const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
        try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const showNotification = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

   const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = async(event) => {
    event.preventDefault()
    try {
    console.log('new blog added')
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
  } 
    const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setBlogFormVisible(false)
      showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
    } catch (exception) {
      showNotification('error creating a blog', 'error')
    }

  }

 if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App