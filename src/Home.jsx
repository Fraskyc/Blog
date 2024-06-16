// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home({ posts, deletePost, currentUser }) {
  return (
    <div>
      <h1>Home</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-preview">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
            <p><strong>Autor:</strong> {post.author}</p>
            <Link to={`/post/${post.id}`}>Číst více</Link>
            <p><small>Datum vytvoření: {post.date}</small></p>
            {post.author === currentUser.username && (
              <button onClick={() => deletePost(post.id)}>Smazat</button>
            )}
          </div>
        ))
      ) : (
        <p>Žádné příspěvky k zobrazení</p>
      )}
    </div>
  );
}

export default Home;
