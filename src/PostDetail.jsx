// PostDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail({ posts, deleteComment, currentUser }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);
  const navigate = useNavigate();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      text: comment,
      date: new Date().toLocaleString(),
      author: currentUser.username
    };
    setComments([...comments, newComment]);
    post.comments.push(newComment);
    setComment('');
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
  };

  const handleDeletePost = () => {
    navigate('/');
    deleteComment(Number(id), null); // Delete the post itself
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><strong>Datum vytvoření:</strong> {post.date}</p>
      <p><strong>Autor:</strong> {post.author}</p>
      {post.author === currentUser.username && (
        <button onClick={handleDeletePost}>Smazat Příspěvek</button>
      )}
      <h2>Komentáře</h2>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <p>{c.text}</p>
            <small>{c.date}</small>
            <p><strong>Autor:</strong> {c.author}</p>
            {c.author === currentUser.username && (
              <button onClick={() => deleteComment(post.id, c.id)}>Smazat</button>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <label htmlFor="comment">Nový komentář</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Přidat komentář</button>
      </form>
    </div>
  );
}

export default PostDetail;
