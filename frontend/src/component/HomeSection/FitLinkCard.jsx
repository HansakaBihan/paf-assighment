import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar.js';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditPost from '../EditPost.js'; 

const FitLinkCard = () => {
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editPostId, setEditPostId] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 

  useEffect(() => {
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
      console.log('Post deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditFitLink = (postId) => {
    setEditPostId(postId); 
    setIsEditModalOpen(true); 
  };

  const handleEditSuccess = () => {
    window.location.reload();
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="home-containers">
      <Sidebar />
  
      {posts.map(post => (
        <section key={post.id} className="shared-pic-section">
          <div className="icon-containers">
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
            <MenuItem onClick={() => handleDeleteFitLink(post.id)}>
              Delete
            </MenuItem>
            <MenuItem onClick={() => handleEditFitLink(post.id)}>
              Edit
            </MenuItem>
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
          
          <br />
          <p>{post.description}</p>
          <br />
          
        </section>
      ))}
  
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <EditPost postId={editPostId} closeModal={() => setIsEditModalOpen(false)} onEditSuccess={handleEditSuccess} />
          </div>
        </div>
      )}
  
      <footer>
        <p>&copy; 2024 Health Club. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FitLinkCard;
