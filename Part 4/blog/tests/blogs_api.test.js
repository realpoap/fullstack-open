const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const blogs = require('../utils/posts_examples')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }

  console.log()

})

describe('blogs', () => {
  test('get all blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check that id is named id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e)
    assert(contents[0].hasOwnProperty('id'), true)
  })

  test('a blog is created', async () => {
    const blogObject = {
      author: 'The dev',
      title: 'how to post a blog',
      url: 'www.thisisfake.net',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDB = await helper.initBlog()
    assert(blogsInDB.length, blogs.length + 1)
  })
})


after(async () => {
  await mongoose.connection.close()
})