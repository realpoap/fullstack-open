const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('../utils/posts_examples')

describe('total likes', () => {
    test('of empty array, equal 0', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result,0)
    })

    test('of one blog post equal its likes count', () => {
        const result = listHelper.totalLikes([blogs[0]])
        assert.strictEqual(result,7)
    })

    test('of a list of objects equal the sum of likes', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result,36)
    })
})