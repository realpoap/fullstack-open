import { useState } from "react"

const Blog = ({ blog }) => {

  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return (
    <div style={blogStyle}>
      <div >
        {blog.title} {blog.author}
      </div>
      <button name="view" onClick={() => setDetailsVisibility(!detailsVisibility)}>
        {detailsVisibility ? 'hide' : 'view'}
      </button>
      {detailsVisibility &&
        <div>
          <p>Url : {blog.url}</p>
          <p>Likes : {blog.likes} <button>Like</button></p>
          <p>User : {blog.user}</p>
          {/* how do you access the user from the front-end ? */}
        </div>}
    </div >
  )


}

export default Blog