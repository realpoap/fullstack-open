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

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return null
    }
    else {
        const authors = blogs.map(b => b.author)
        const authorList = _.union(authors)
        console.log('authorList', authorList);

        const findAuthorCount = (acc, author) => {
            console.log('author in reduce', author);
            const authorBlogs = blogs.filter(b => b.author === author)
            const authorLikes = _.map(authorBlogs, 'likes')
            const likes = _.sum(authorLikes)
            const newAcc = _.concat(acc, { author, likes })
            console.log('newAcc', newAcc)
            return newAcc
        }

        const authorCount = authorList.reduce(findAuthorCount, [])

        const bestAuth = _.maxBy(authorCount, 'likes')
        console.log('bestAuthor is', bestAuth)

        return bestAuth

    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    authorByBlogCount,
    mostLikes
}