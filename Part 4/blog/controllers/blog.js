const blogRouter = require('express').Router()

const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  return response.json(blog)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

  const body = request.body

  // TOKEN AUTH
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  // BLOG CREATION
  if (!body.title || !body.url) {
    response.status(400).end()
  }
  else {

    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })
    const returnedBlog = await blog.save()

    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()

    response.status(201).json(returnedBlog)
  }

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const blogToDelete = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  else {
    if (blogToDelete.user.toString() === request.user.id.toString())
      await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.json(updatedBlog)
})

module.exports = blogRouter