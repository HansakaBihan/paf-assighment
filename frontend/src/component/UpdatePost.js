import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdatePost.css'; // Import CSS file for styling

const UpdatePost = ({ postId, onClose }) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');

  useEffect(() => {
    // Fetch post data based on postId
    fetch(`http://localhost:8080/post/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        setDescription(data.description);
        // Set images and video based on fetched data
        // Assuming you have appropriate logic to handle images and video
        // Here's an example of setting images:
        const fetchedImages = []; // Assuming data.images is an array of image URLs
        data.images.forEach((imageUrl, index) => {
          // Fetch each image and convert it to Blob
          fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
              const file = new File([blob], `image${index + 1}`);
              fetchedImages[index] = file;
              // If all images are fetched, setImages
              if (index === data.images.length - 1) {
                setImages(fetchedImages);
              }
            })
            .catch(error => console.error('Error fetching image:', error));
        });
        // Set video similarly if needed
        setVideo(data.video); // Assuming data.video is the video URL
      })
      .catch(error => console.error('Error fetching post data:', error));
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
          onClose: () => {
            onClose(); // Close the modal
            window.location.reload(); // Reload the page
          }
        });
      } else {
        console.error('Failed to update post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  return (
    <div className="update-post-container">
      <div className="modal-header">
        <h2>Update Post</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
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
              <label className="file-upload">
                Choose Image {index + 1}:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, index)}
                />
              </label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="file-upload">
            Choose Video:
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </label>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;
