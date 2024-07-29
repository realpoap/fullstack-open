import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <p>Author : </p>
          <input
            type="text"
            id={"author-input"}
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <p>Title : </p>
          <input
            type="text"
            id={"title-input"}
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <p>Url : </p>
          <input
            type="text"
            id={"url-input"}
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
