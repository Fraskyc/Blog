// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import PostDetail from './PostDetail';
import Login from './Login';

function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id || post.author !== currentUser.username);
    setPosts(updatedPosts);
  };

  const deleteComment = (postId, commentId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter(comment => comment.id !== commentId || comment.author !== currentUser.username);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const registerUser = (username, password) => {
    const newUser = { username, password };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const loginUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Špatné uživatelské jméno nebo heslo');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={loginUser} onRegister={registerUser} />;
  }

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="navbar-link">Vytvořit</Link>
          </li>
          <li className="navbar-item">
            <button onClick={logoutUser} className="navbar-link">Odhlásit</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home posts={posts} deletePost={deletePost} currentUser={currentUser} />} />
          <Route path="/create" element={<Create addPost={addPost} currentUser={currentUser} />} />
          <Route path="/post/:id" element={<PostDetail posts={posts} deleteComment={deleteComment} currentUser={currentUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
