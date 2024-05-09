import React, { useState, useEffect } from 'react';
import './Home.css';
import girlPic from '../assets/girlpic.jpg'; // Import the girlpic image
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
 // Import Link from react-router-dom

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/post/get');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="fitness-quote-banner">
        <h2>Welcome to Health Club Fitness</h2>
        <p>Discover new workouts, healthy recipes, and lifestyle tips.</p>
      </div>
      <Sidebar />

      <section className="shared-pics-section">
        <div className="shared-pics-container">
          {posts.map(post => (
            <div key={post.id} className="shared-pic">
              <div className="image-container">
                <img src={`http://localhost:8080/uploads/${post.imagePath1}`} alt="Image 1" />
                <img src={`http://localhost:8080/uploads/${post.imagePath2}`} alt="Image 2" />
                <img src={`http://localhost:8080/uploads/${post.imagePath3}`} alt="Image 3" />
              </div>
              <video controls>
                <source src={`http://localhost:8080/uploads/${post.videoPath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="interaction">
                <button><i className="fas fa-heart"></i> Like</button>
                <button><i className="fas fa-comment"></i> Comment</button>
              </div>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <Link to="/profile">
          <div className="profile-info">
            <img src={girlPic} alt="Profile Pic" />
            <h3>Shanon Fernando</h3>
            <p>Inspired builder</p>
            <div className="profile-stats">
              <div className="stat">
                <i className="fas fa-user-friends"></i>
                <span>Followers: 100</span>
              </div>
              <div className="stat">
                <i className="fas fa-heart"></i>
                <span>Likes: 200</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="latest-news">
          <h3>Latest Fitness News</h3>
          <ul>
            <li>
              <h4>New Study Shows Benefits of High-Intensity Interval Training</h4>
              <p>A recent study published in the Journal of Exercise Science & Fitness found that high-intensity interval training (HIIT) can significantly improve cardiovascular health and endurance.</p>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Health Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
