const { test, describe, beforeEach } = require('node:test')
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

})