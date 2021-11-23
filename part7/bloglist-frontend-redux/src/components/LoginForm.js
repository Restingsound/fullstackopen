import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addLogin = (event) => {
    event.preventDefault();
    createLogin({
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="loginForm">
      <h2>Login</h2>

      <form onSubmit={addLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired,
};

export default LoginForm;
