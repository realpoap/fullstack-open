const Blog = require('../models/blog')


const initBlog = async () => {
  const blog = await Blog.find()
  return blog.map(b => b.toJSON())
}



module.exports = {
  initBlog,
}