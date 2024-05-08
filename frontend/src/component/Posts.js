import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Modal,Typography } from '@mui/material';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa'; // Import icons for edit, delete, and view actions
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import AddPost from './AddPost'; // Import the AddPost component
import './Posts.css'; // Import custom CSS styles

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/post/get')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const onDelete = (postId) => {
    // Implement delete logic
    console.log('Delete post with ID:', postId);

    // Make DELETE request to API
    fetch(`http://localhost:8080/post/posts/${postId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // If successful, remove the post from the state
        setPosts(posts.filter(post => post.id !== postId));

        // Show success toast
        toast.success('Post deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      } else {
        console.error('Failed to delete post:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  };

  const onEdit = (postId) => {
    // Implement edit logic
    console.log('Edit post with ID:', postId);
  };

  const onView = (postId) => {
    // Implement view logic
    console.log('View post with ID:', postId);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const filteredPosts = posts.filter(post => post.description.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="page-container">
      <div className="content-box">
        <Typography variant="h4" gutterBottom>All Posts</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Search"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          /> 
          <Button variant="contained" startIcon={<FaPlus />} onClick={handleModalOpen} color="primary">
            Add Post
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">File 1</TableCell>
                <TableCell align="left">File 2</TableCell>
                <TableCell align="left">File 3</TableCell>
                <TableCell align="left">Video</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell align="left">{post.description}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => onEdit(post.id)}><FaEdit /></Button>
                    <Button onClick={() => onDelete(post.id)}><FaTrash /></Button>
                    <Button onClick={() => onView(post.id)}><FaEye /></Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => window.open(post.file1)}>View File 1</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => window.open(post.file2)}>View File 2</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => window.open(post.file3)}>View File 3</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => window.open(post.video)}>View Video</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="add-post-modal-title"
        aria-describedby="add-post-modal-description"
        className="modal-container" // Apply custom class for styling
      >
        <AddPost />
      </Modal>
    </div>
  );
};

export default Posts;
