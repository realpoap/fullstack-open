import { useState, useEffect } from 'react'

import blogService from '../services/blogs'

import PropTypes from 'prop-types'

const Blog = ({ blog, sortBlogs, deleteBlog, user }) => {

  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const [blogUser, setBlogUser] = useState(null)
  const [removeBtn, setRemoveBtn] = useState(false)

  const [blogObject, setBlogObject] = useState({
    user: blog.user,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    id: blog.id
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    blogService
      .getUser(blog.user)
      .then(user => {
        setBlogUser(user)
      })
  }, [blog.user])

  const incrementLikes = async (blog) => {
    const blogIncremented = {
      user: blogObject.user,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    await blogService
      .update(blogObject.id, blogIncremented)
      .then(returnedObject => setBlogObject(returnedObject))

    sortBlogs()
  }

  useEffect(() => {
    if (user && blogUser && user.name === blogUser.name) {
      setRemoveBtn(true)
    }
    // would like to use the blog.user and user.id but user only stores the token, username and name, shall I implement this or is it a security risk ?
  }, [blogUser, user])

  const BlogDetails = () => {

  }


  return (
    <div style={blogStyle} className='blogdiv'>
      <div className='blog-info'>
        {blogObject.title}, by {blogObject.author}
      </div>
      <button
        name="view"
        className='btn-show'
        onClick={() => setDetailsVisibility(!detailsVisibility)}
      >
        {detailsVisibility ? 'hide' : 'view'}
      </button>
      {detailsVisibility ? (
        <div>
          <p>blog ID : {blogObject.id}</p>
          <p>Url : {blogObject.url}</p>
          <p>Likes : {blogObject.likes}
            <button
              className={'likeBtn'}
              onClick={() => incrementLikes()}
            >
              Like
            </button>
          </p>
          <p>User : {blogUser.username}</p>
          {removeBtn && <button style={{ backgroundColor: 'red' }} className='deleteBtn' onClick={() => deleteBlog(blog)}>remove</button>}

        </div>

      ) : null}
    </div >
  )


}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  sortBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog