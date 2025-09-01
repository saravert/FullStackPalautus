const lodash = require('lodash')
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
  if (blogs.length === 0){
    return null
  }
  
  let mostLiked = blogs[0]
  for (let i = 0; i < blogs.length; i++){
    if(mostLiked.likes < blogs[i].likes){
      mostLiked = blogs[i]
    }
  }
  return mostLiked
}

const mostBlogs = (blogs) => {
  //if (blogs.length === 0) return null

}

module.exports = {
  dummy, totalLikes, favoriteBlog
}