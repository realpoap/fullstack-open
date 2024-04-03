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
		const object = contents[0]
		assert(object.hasOwnProperty('id'), true)
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
	})

	test('title is missing', async () => {
		const blogObject = {
			author: 'The dev',
			url: 'superfake.org',
			likes: 1
		}
		await api
			.post('/api/blogs/')
			.send(blogObject)
			.expect(400)
	})

})



after(async () => {
	await mongoose.connection.close()
})