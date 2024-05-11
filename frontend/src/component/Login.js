import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling if needed
import coverImage from '../assets/cover.jpg'; // Import the image using a relative path
import Swal from 'sweetalert2';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === 'Hansaka' && password === 'Hansaka@123') {
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login successful!',
        timer: 2000, // Show the alert for 2 seconds
        showConfirmButton: false
      }).then(() => {
        // Redirect to profile page
        window.location.href = '/profile';
      });
    } else {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect username or password!',
      });
    }
  };

  return (
    <div className="login-page-container">
      <div className="form-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
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
