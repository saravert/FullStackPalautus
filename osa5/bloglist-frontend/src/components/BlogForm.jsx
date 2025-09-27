const BlogForm = ({ addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl }) => {
return (
<form onSubmit={addBlog}>
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