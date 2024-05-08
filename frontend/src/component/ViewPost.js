import React, { useState, useEffect } from 'react';
import { FaImage, FaVideo } from 'react-icons/fa';
import './ViewPost.css'; // Import CSS file for styling

const ViewPost = ({ postId, onClose }) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('');
  const [file3, setFile3] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch post data based on postId
    fetch(`http://localhost:8080/post/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDescription(data.description);
        setImages(data.images || []);
        setVideo(data.video || '');
        setFile1(data.file1 || '');
        setFile2(data.file2 || '');
        setFile3(data.file3 || '');
      })
      .catch(error => console.error('Error fetching post data:', error));
  }, [postId]);

  const openModal = (mediaUrl, type) => {
    setSelectedMedia(mediaUrl);
    setMediaType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setModalOpen(false);
  };

  return (
    <div className="view-post-container">
      <div className="modal-header">
        <h2>View Post</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="post-content">
        <p>Description: {description}</p>
        <div className="media-gallery">
          {images.map((imageUrl, index) => (
            <div key={index} className="media-item">
              <img src={imageUrl} alt={`Image ${index + 1}`} />
              <button className="view-media-button" onClick={() => openModal(imageUrl, 'image')}>
                <FaImage />
              </button>
            </div>
          ))}
          {video && (
            <div className="media-item">
              <video controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button className="view-media-button" onClick={() => openModal(video, 'video')}>
                <FaVideo />
              </button>
            </div>
          )}
          {file1 && (
            <div className="media-item">
              <button className="view-media-button" onClick={() => openModal(file1, 'file')}>
                File 1
              </button>
            </div>
          )}
          {file2 && (
            <div className="media-item">
              <button className="view-media-button" onClick={() => openModal(file2, 'file')}>
                File 2
              </button>
            </div>
          )}
          {file3 && (
            <div className="media-item">
              <button className="view-media-button" onClick={() => openModal(file3, 'file')}>
                File 3
              </button>
            </div>
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {mediaType === 'image' && <img src={selectedMedia} alt="Modal" />}
            {mediaType === 'video' && (
              <video controls>
                <source src={selectedMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {mediaType === 'file' && (
              <iframe src={selectedMedia} title="File" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
