import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'

const Blog = ({ blog, handleVote, handleDelete, handlePostComment }) => {

  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'
  const comments = blog.comments

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  console.log(blog.user, storage.me(), canRemove)

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handlePostComment(blog.id, comment)
    setComment('')
  }



  return (
    <div>
      <div>{blog.title} by {blog.author}</div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes : {blog.likes}</div>

      <button onClick={() => setVisible(!visible)}>
        {visible ? 'close options' : 'options'}
      </button>
      {visible && (
        <div>

          <button
            onClick={() => handleVote(blog)}>
            like
          </button>

          <div>{nameOfUser}</div>
          {canRemove && <button onClick={() => handleDelete(blog)}>
            remove
          </button>}
        </div>
      )}
      <div>
        <h3>Comments :</h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={comment}
            onChange={handleCommentChange}
          />
          <button type='submit'>Comment</button>
        </form>
        <ul>
          {[...comments].map(c =>
            <li key={c.id}>{c.content}</li>
          )}
        </ul>
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog