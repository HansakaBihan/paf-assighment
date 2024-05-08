import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddPost.css'; // Import CSS file for styling

const AddPost = () => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');

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
      // Make POST request to API
      const response = await fetch('http://localhost:8080/post/posts', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // If successful, show success toast
        toast.success('Post added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            // Refresh the whole page after closing the toast
            window.location.reload();
          }
        });

        // Reset form fields
        setDescription('');
        setImages([]);
        setVideo('');
      } else {
        console.error('Failed to add post:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="add-post-container">
      <h2>Add New Post</h2>
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
              <label htmlFor={`images${index + 1}`}>Upload Image {index + 1}:</label>
              <input
                type="file"
                id={`images${index + 1}`}
                accept="image/*"
                onChange={(event) => handleImageChange(event, index)}
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="video">Upload Video:</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
