const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    if (blogs.length === 0) {
        return 0
    } else if(blogs.length === 1) {
        return blogs[0].likes
    } else {
        return blogs.reduce(reducer, 0)
    }
}
  
  module.exports = {
    dummy,
    totalLikes
  }