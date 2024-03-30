const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.reduce(reducer, 0)
    }
}

const favoriteBlog = (blogs) => {
    const findHighestLikes = (accumulator, blog) => {
        return Math.max(accumulator, blog.likes)
    }

    if (blogs.length === 0) {
        return null
    } else {
        const highestLikes = blogs.reduce(findHighestLikes, 0)
        const goatBlogs = blogs.filter(blog => blog.likes === highestLikes)
        const favoriteBlog = {
            title: goatBlogs[0].title,
            author: goatBlogs[0].author,
            likes: goatBlogs[0].likes,
        }
        return favoriteBlog
    }
}

const authorByBlogCount = (blogs) => {



    if (blogs.length === 0) {
        return null
    }
    else {
        const bestAuthor = _.maxBy(blogs, (b) => b.author).author
        const count = _.countBy(blogs, (b) => bestAuthor)
        const author = {
            author: bestAuthor,
            blogs: _.values(count)[0]
        }
        return author
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    authorByBlogCount
}