import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'

import { List, ListItem, ListItemText, Button, Typography, TextField } from '@mui/material'

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
      <Typography variant='h4'> {blog.title} by {blog.author}</Typography>
      <Typography variant='body1'><a href={blog.url}>{blog.url}</a></Typography>
      <Typography variant='body1'>Likes : {blog.likes}</Typography>
      <Button
        size='small'
        variant='contained'
        color='disabled'
        onClick={() => handleVote(blog)}>
        Like !
      </Button>

      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'close options' : 'options'}
      </Button>
      {visible && (
        <div>

          <div>
            <Typography variant='caption'>{nameOfUser}</Typography>

            {canRemove && <Button size='small' color='secondary' onClick={() => handleDelete(blog)}>
              remove
            </Button>}
          </div>
        </div>
      )}
      <div>
        <Typography variant='h6'>Comments :</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            type='text'
            value={comment}
            variant='standard'
            onChange={handleCommentChange}
          />
          <Button color='disabled' variant='contained' type='submit'>Comment</Button>
        </form>
        <List dense='dense'>
          {[...comments].map(c =>
            <ListItem key={c.id}>
              <ListItemText>
                {c.content}
              </ListItemText>
            </ListItem>
          )}
        </List>
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