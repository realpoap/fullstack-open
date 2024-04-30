const { test, after, describe, beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const blogs = require('../utils/posts_examples')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)

})

describe('get blogs', () => {
  test('get all blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check that id is named id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e)
    const object = contents[0]
    assert(object.hasOwnProperty('id'), true)
  })

})

describe('user management', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'admin', passwordHash })

    await user.save()
  })

  test('username is incorrect, user not created', async () => {
    const userObject = { username: 'ro', password: 'password' }

    const response = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)

    console.error('Error : ', response.body.error)


  })

  test('password is incorrect, user not created', async () => {
    const userObject = { username: 'root', password: 'pa' }

    const response = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)

    console.error('Error : ', response.body.error)

  })

})


describe('post blog', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'admin', passwordHash })

    await user.save()
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
    assert.strictEqual(blogsInDB.length, blogs.length + 1)
  })

  test('an user is associated at the creation of a blog', async () => {
    const blogObject = {
      author: 'The dev',
      title: 'has user',
      url: 'www.thisisfake.net',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = User.findOne({ username: 'admin' })
    const blogPosted = Blog.findOne({ title: 'has user' })

    assert(blogPosted.user = user)
  })

  test('if no likes property, set to 0', async () => {
    const blogObject = {
      author: 'The dev',
      title: 'default likes property',
      url: 'www.thisisfake.net',
    }
    const response = await api
      .post('/api/blogs/')
      .send(blogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('url is missing', async () => {
    const blogObject = {
      author: 'The dev',
      title: 'url is missing',
      likes: 1
    }
    await api
      .post('/api/blogs/')
      .send(blogObject)
      .expect(400)


    const blogsInDB = await helper.initBlog()
    assert.strictEqual(blogsInDB.length, blogs.length)

  })

  test('title is missing', async () => {
    const blogObject = {
      author: 'The dev',
      url: 'superfake.org',
      likes: 1,
    }
    await api
      .post('/api/blogs/')
      .send(blogObject)
      .expect(400)


    const blogsInDB = await helper.initBlog()
    assert.strictEqual(blogsInDB.length, blogs.length)
  })
})

describe('update or delete blog', () => {
  test('delete a post by id', async () => {
    const blogAtStart = await helper.initBlog()

    await api
      .delete(`/api/blogs/${blogAtStart[0].id}`)
      .expect(204)

    const blogsInDB = await helper.initBlog()
    const content = await blogsInDB.map(r => r.content)
    assert.strictEqual(blogsInDB.length, blogs.length - 1)
    assert(!content.includes(blogAtStart[0]))
  })

  test('update a post by id', async () => {
    const blogAtStart = await helper.initBlog()
    const blogToUpdate = blogAtStart[2]
    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 1,
      user: blogToUpdate.user
    }


    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
    const updatedBlog = await Blog.findById(blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, 1)
  })
})



after(async () => {
  await mongoose.connection.close()
})