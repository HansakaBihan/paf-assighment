// WorkoutStatusCard.js
import React, { useState, useEffect } from "react";
import "./WorkoutStatusCard.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Form } from "react-bootstrap";

function WorkoutStatusCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [workout, setWorkout] = useState({
    distanceRan: "",
    pushupsCompleted: "",
    weightLifted: "",
    description: ""
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/status/get/313")
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
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Implement delete functionality here
    setAnchorEl(null);
  };

  const handleLike = () => {
    // Implement like functionality here
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
  );
}

export default WorkoutStatusCard;
