const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(err => next(err))
  })
  
blogRouter.post('/', (request, response, next) => {
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    blog.save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err => next(err))
  })

  module.exports = blogRouter