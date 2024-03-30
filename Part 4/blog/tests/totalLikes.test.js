const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('../utils/posts_examples')

describe('total likes', () => {
    test('of empty array, equal 0', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('of one blog post equal its likes count', () => {
        const result = listHelper.totalLikes([blogs[0]])
        assert.strictEqual(result, 7)
    })

    test('of a list of objects equal the sum of likes', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('GOAT blog', () => {
    test('of empty array, equal 0', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })

    test('of one blog post equal its likes count', () => {
        const result = listHelper.favoriteBlog([blogs[0]])
        const oneBlog = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        }
        assert.deepStrictEqual(result, oneBlog)
    })

    test('of a list of objects equal the sum of likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        const goatBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        }
        assert.deepStrictEqual(result, goatBlog)
    })
})

describe('best author', () => {
    test('by blog count equal', () => {
        const result = listHelper.authorByBlogCount(blogs)
        const bestAuthor = {
            author: 'Robert C. Martin',
            blogs: 6
        }
        assert.deepStrictEqual(result, bestAuthor)
    })

    test('by likes equal', () => {
        const result = listHelper.mostLikes(blogs)
        const bestAuthor = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        assert.deepStrictEqual(result, bestAuthor)
    })
})