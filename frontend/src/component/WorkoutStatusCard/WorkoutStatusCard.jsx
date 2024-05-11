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
import WorkoutStatusCardUpdate from "./WorkoutStatusUpdate";

const id = 356

function WorkoutStatusCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [workout, setWorkout] = useState({
    distanceRan: "",
    pushupsCompleted: "",
    weightLifted: "",
    description: ""
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleDelete = () => {
    // Show a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this workout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/status/delete/${id}`, {
          method: "DELETE"
        })
          .then(response => {
            if (response.ok) {
              // If deletion is successful, reset the workout state
              setWorkout({
                distanceRan: "",
                pushupsCompleted: "",
                weightLifted: "",
                description: ""
              });
              // Show success message
              Swal.fire('Deleted!', 'Your workout has been deleted.', 'success');
            } else {
              // If deletion fails, show error message
              Swal.fire('Failed to delete workout', '', 'error');
            }
          })
          .catch(error => {
            // If there's an error with the fetch request, show error message
            console.error("Error deleting workout:", error);
            Swal.fire('Failed to delete workout', '', 'error');
          });
      }
    });
  };

  const handleLike = () => {
    // Implement like functionality here
  };

  const openModal = () => {
    setModalOpen(true);
    handleClose(); // Close the menu when opening the modal
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="workout-status-card">
        <div className="card-header">
          <Avatar alt="username" />
          <div className="user-details">
            <span className="username">Hansaka Bihan</span>
            <span className="timestamp">  @hans . 1m</span>
          </div>
          <Button
            id="basic-button"
            aria-controls={isMenuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="more-icon-button"
          >
            <MoreHorizIcon />
          </Button>
          {editMode && (
            <Button onClick={handleLike} className="like-icon-button">
              <FavoriteIcon />
            </Button>
          )}
          {!editMode && (
            <Button onClick={openModal} className="edit-icon-button">
              <FavoriteBorderIcon />
            </Button>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={openModal}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <div className="card-content">
          <p className="status-text">This is my latest update</p>
          <div className="workout-details">
            <div className="workout-info">
              <h3>{workout.name}</h3>
              <p>{workout.reps}</p>
              <p>{workout.date}</p>
            </div>
          </div>
          <div className="update-workout">
            <Form.Group>
              <Form.Label>Distance Ran (Km)</Form.Label>
              <Form.Control type="text" readOnly value={workout.distanceRan} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pushups Completed (Nos)</Form.Label>
              <Form.Control type="text" readOnly value={workout.pushupsCompleted} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight Lifted (Kg)</Form.Label>
              <Form.Control type="text" readOnly value={workout.weightLifted} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} readOnly value={workout.description} />
            </Form.Group>
          </div>
        </div>
        <div className="card-actions">
          <Button onClick={handleLike} className="like-button">
            Like
          </Button>
          <Button className="comment-button">Comment</Button>
        </div>
      </div>
      {modalOpen && <WorkoutStatusCardUpdate closeModal={closeModal} />}
    </>
  );
}

export default WorkoutStatusCard;
