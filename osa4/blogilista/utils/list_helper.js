const _ = require('lodash')
const User = require('../models/user')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0) 
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  
  let mostLiked = blogs[0]
  for (let i = 0; i < blogs.length; i++){
    if(mostLiked.likes < blogs[i].likes){
      mostLiked = blogs[i]
    }
  }
  return mostLiked
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const amounts = _.countBy(blogs, 'author')
  const amountstoArray = Object.entries(amounts).map(([author, count]) => ({
    author, blogs: count
  }))
  const mostBlogs = _.orderBy(amountstoArray, ['blogs'], ['desc'])
  console.log('most blogs are made by ' + mostBlogs[0].author)
  return mostBlogs[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const amounts = _.groupBy(blogs, 'author')
  console.log(amounts)
  const mapAuthors = _.map(amounts, (blogsBy, author) => ({
    author, 
    likes: _.sumBy(blogsBy, 'likes')
  }))
  console.log(mapAuthors)
  const mostLikes = _.maxBy(mapAuthors, 'likes')
  console.log(mostLikes.author + mostLikes.likes)
  return mostLikes
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, usersInDb
}