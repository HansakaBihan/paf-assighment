import React from 'react';
import './Login.css'; // Import your CSS file for styling if needed
import coverImage from '../assets/cover.jpg'; // Import the image using a relative path

function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="form-container">
        <h2 className="login-heading">Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-link">I don't have an account, <a href="/Register">Sign up</a></p>
      </div>
      <div className="image-container">
        <img src={coverImage} alt="Login" />
      </div>
    </div>
  );
}

export default LoginPage;
