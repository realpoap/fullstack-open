import { useState, useEffect } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const [blogUser, setBlogUser] = useState(null)
  const [blogObject, setBlogObject] = useState({
    user: blog.user,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const userID = blog.user

  useEffect(() => {
    blogService
      .getUser(userID)
      .then(user => {
        setBlogUser(user)
      })
  }, [])

  const incrementLikes = async () => {
    const blogIncremented = {
      user: blogObject.user,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    await blogService
      .update(blog.id, blogIncremented)
      .then(returnedObject => setBlogObject(returnedObject))

  }


  return (
    <div style={blogStyle}>
      <div >
        {blogObject.title}, by {blogObject.author}
      </div>
      <button name="view" onClick={() => setDetailsVisibility(!detailsVisibility)}>
        {detailsVisibility ? 'hide' : 'view'}
      </button>
      {detailsVisibility &&
        <div>
          <p>Url : {blogObject.url}</p>
          <p>Likes : {blogObject.likes} <button onClick={() => incrementLikes()}>Like</button></p>
          <p>User : {blogUser.username}</p>
        </div>}
    </div >
  )


}

export default Blog