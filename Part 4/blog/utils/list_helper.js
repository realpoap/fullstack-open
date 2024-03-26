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
        console.log(accumulator);
        return Math.max(accumulator, blog.likes)
    }

    if (blogs.length === 0) {
        return null
    } else {
        const highestLikes = blogs.reduce(findHighestLikes, 0)
        const goatBlogs = blogs.filter(blog => blog.likes === highestLikes)
        console.log('goats: ', goatBlogs);
        const favoriteBlog = {
            title: goatBlogs[0].title,
            author: goatBlogs[0].author,
            likes: goatBlogs[0].likes,
        }
        return favoriteBlog
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}