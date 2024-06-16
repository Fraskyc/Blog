// Login.js
import React, { useState } from 'react';

function Login({ onLogin, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Přihlášení</h1>
      <input
        type="text"
        placeholder="Uživatelské jméno"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => onRegister(username, password)}>Registrovat</button>
      <button onClick={() => onLogin(username, password)}>Přihlásit</button>
    </div>
  );
}

export default Login;
