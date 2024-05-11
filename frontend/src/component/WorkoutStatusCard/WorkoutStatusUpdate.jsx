import React, { useState, useEffect } from "react";
import "./WorkoutStatusCard.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2';

const id = 324;

function WorkoutStatusCardUpdate() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [workout, setWorkout] = useState({
    distanceRan: "",
    pushupsCompleted: "",
    weightLifted: "",
    description: ""
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/status/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setWorkout(data);
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpen(true);
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Implement delete functionality here
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/status/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workout)
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful update
          console.log("Workout updated successfully");
          Swal.fire('Updated!', 'Your workout has been updated.', 'success');
          handleClose(); // Close the modal
          window.location.href = '/profile';
          // You can also update the UI or show a success message
        } else {
          // Handle update failure
          console.error("Failed to update workout");
          Swal.fire('Failed to update workout', '', 'error');
          // You can show an error message or handle the error in a different way
        }
      })
      .catch((error) => {
        console.error("Error updating workout:", error);
        Swal.fire('Failed to update workout', '', 'error');
        // Handle the error, e.g., show an error message
      });
  };
  
  
  

  return (
    <div className="workout-status-card">
      <div className="card-header">
        <Avatar alt="username" />
        <div className="user-details">
          <span className="username">Hansaka Bihan</span>
          <span className="timestamp">  @hans . 1m</span>
        </div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          className="more-icon-button"
        >
          <MoreHorizIcon />
        </Button>
        
        {!editMode && (
          <Button onClick={handleEdit} className="edit-icon-button">
            <FavoriteBorderIcon />
          </Button>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
      <div className="card-content">
        <p className="status-text"> Enter the latest Update of your Workout </p>
        <div className="workout-details">
          <div className="workout-info">
            <h3>{workout.name}</h3>
            <p>{workout.reps}</p>
            <p>{workout.date}</p>
          </div>
        </div>
        <div className="update-workout">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Distance Ran (Km)</Form.Label>
              <Form.Control
                type="text"
                name="distanceRan"
                value={workout.distanceRan}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pushups Completed (Nos)</Form.Label>
              <Form.Control
                type="text"
                name="pushupsCompleted"
                value={workout.pushupsCompleted}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight Lifted (Kg)</Form.Label>
              <Form.Control
                type="text"
                name="weightLifted"
                value={workout.weightLifted}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={workout.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
      
    </div>
  );
}

export default WorkoutStatusCardUpdate;
