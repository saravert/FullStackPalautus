require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const config = require('./utils/config')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})