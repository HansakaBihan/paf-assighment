// Home.js

import React, { useState, useEffect } from 'react';
import './Home.css';
import girlPic from '../assets/girlpic.jpg'; // Import the girlpic image
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditPost from './EditPost'; // Import EditPost component

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editPostId, setEditPostId] = useState(null); // State variable to store the post ID for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State variable to manage the visibility of the edit modal

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFitLink = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/post/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      // Handle successful deletion
      console.log('Post deleted successfully');
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditFitLink = (postId) => {
    setEditPostId(postId); // Set the post ID for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleEditSuccess = () => {
    // Perform any actions needed after successful edit
    // For example, trigger a page refresh
    window.location.reload();
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="home-container">
      <div className="fitness-quote-banner">
        <h2>Welcome to Health Club Fitness</h2>
        <p>Discover new workouts, healthy recipes, and lifestyle tips.</p>
      </div>
      <Sidebar />

      {posts.map(post => (
        <section key={post.id} className="shared-pics-section">
          <div className="icon-container">
            <IconButton
              aria-controls="post-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className="icon"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="post-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleDeleteFitLink(post.id)}>Delete</MenuItem>
              <MenuItem onClick={() => handleEditFitLink(post.id)}>Edit</MenuItem> {/* Pass the post ID */}
            </Menu>
          </div>
          <Slider {...sliderSettings}>
            <div>
              <img src={`http://localhost:8080/uploads/${post.imagePath1}`} alt="Image 1" className="landscape-image" />
            </div>
            <div>
              <img src={`http://localhost:8080/uploads/${post.imagePath2}`} alt="Image 2" className="landscape-image" />
            </div>
            <div>
              <img src={`http://localhost:8080/uploads/${post.imagePath3}`} alt="Image 3" className="landscape-image" />
            </div>
            <div>
              <video controls className="landscape-video">
                <source src={`http://localhost:8080/uploads/${post.videoPath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Slider>
          <div className="interaction">
            <button><i className="fas fa-heart"></i> Like</button>
            <button><i className="fas fa-comment"></i> Comment</button>
          </div>
          <p>{post.description}</p>
        </section>
      ))}

      {/* Render EditPost component as a modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <EditPost postId={editPostId} closeModal={() => setIsEditModalOpen(false)} onEditSuccess={handleEditSuccess} />
          </div>
        </div>
      )}

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
