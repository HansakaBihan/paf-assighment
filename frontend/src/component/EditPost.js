import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditPost.css'; // Import CSS file for styling

const EditPost = ({ postId, closeModal, onEditSuccess }) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');

  useEffect(() => {
    // Fetch post data based on postId
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/post/posts/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setDescription(postData.description);
          // Set images if available
          if (postData.images) {
            setImages(postData.images);
          }
          // Set video if available
          if (postData.video) {
            setVideo(postData.video);
          }
        } else {
          console.error('Failed to fetch post:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('description', description);
    images.forEach((image, index) => {
      if (image) {
        formData.append(`file${index + 1}`, image);
      }
    });
    formData.append('video', video);

    try {
      // Make PUT request to update post
      const response = await fetch(`http://localhost:8080/post/posts/${postId}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        // If successful, show success toast
        toast.success('Post updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Call the onEditSuccess callback to indicate successful edit
        onEditSuccess();
        // Close the modal
        closeModal();
      } else {
        console.error('Failed to update post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label htmlFor={`images${index + 1}`}>Update Image {index + 1}:</label>
              <input
                type="file"
                id={`images${index + 1}`}
                accept="image/*"
                onChange={(event) => handleImageChange(event, index)}
              />
              {images[index] && <p>Selected image path: {images[index].name}</p>}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="video">Update Video:</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
          />
          {video && <p>Selected video path: {video.name}</p>}
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
