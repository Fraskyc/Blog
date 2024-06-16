// Create.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create({ addPost, currentUser }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleString(),
      author: currentUser.username,
      comments: []
    };
    addPost(newPost);
    navigate('/');
  };

  return (
    <div>
      <h1>Vytvořit nový příspěvek</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titulek</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Obsah</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Vytvořit</button>
      </form>
    </div>
  );
}

export default Create;
