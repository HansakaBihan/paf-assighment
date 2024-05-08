import React from 'react';
import './Register.css'; // Import your CSS file for styling if needed
import coverImage from '../assets/register.jpg'; // Import the image using a relative path

function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="form-container">
        <h2 className="login-heading">Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-link">I have an account, <a href="/Login">Login</a></p>
      </div>
      <div className="image-container">
        <img src={coverImage} alt="Login" />
      </div>
    </div>
  );
}

export default LoginPage;
