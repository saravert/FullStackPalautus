const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Author 1',
    url: 'https://example.com/first-blog',
    likes: 5
  },
  {
    title: 'Second blog',
    author: 'Author 2',
    url: 'https://example.com/second-blog',
    likes: 10
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('check if unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach((blog) => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('add a new blog', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Author 3',
    url: 'https://example.com/new-blog',
    likes: 16
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert.strictEqual(blogs.length, initialBlogs.length + 1)
  const addedBlog = blogs.find(blog => blog.title === newBlog.title)
  assert.strictEqual(addedBlog.author, newBlog.author)
  assert.strictEqual(addedBlog.url, newBlog.url)
  assert.strictEqual(addedBlog.likes, newBlog.likes)
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Author 4',
    url: 'https://example.com/blog-without-likes'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const addedBlog = blogs.find(blog => blog.title === newBlog.title)
  assert.strictEqual(addedBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})