import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
        const users = await response.json();
        if (users.length === 1) {
          onLogin(users[0]);
        } else {
          setError('Invalid username or password.');
        }
      } catch (err) {
        setError('Error connecting to the server.');
      }
    };
  
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Login
        </button>
      </form>
    );
  };

  export default Login;