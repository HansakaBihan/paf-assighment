import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlanSharingCard.css";
import DeleteIcon from './deleteBtn.png';
import EditIcon from './editBtn.png';
import profileImage from "./avatar.png";

function PlanSharingCard() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/workout-plans/workouts")
      .then((response) => {
        setWorkoutPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
      });
  }, []);

  const handleDelete = (planId) => {
    axios
      .delete(`http://localhost:8080/api/workout-plans/${planId}`)
      .then((response) => {
        console.log("Plan deleted successfully");
        // Remove the deleted plan from the state
        setWorkoutPlans(workoutPlans.filter(plan => plan.id !== planId));
      })
      .catch((error) => {
        console.error("Error deleting plan:", error);
      });
  };

  const handleUpdate = (planId) => {
    // Redirect to the UpdateWorkoutForm page with the plan ID as a URL parameter
    navigate(`/update-workout/${planId}`);
  };

  return (
    <div className="plan-list">
      {workoutPlans.map((plan) => (
        <div key={plan.id} className="plan-item">
          <div className="edit-delete-btn">
            <img
              src={DeleteIcon}
              alt="Delete"
              className="e-delete-icon"
              height="20px"
              width="20px"
              onClick={() => handleDelete(plan.id)}
            />
            <img
              src={EditIcon}
              alt="Edit"
              className="e-edit-icon"
              height="20px"
              width="20px"
              onClick={() => handleUpdate(plan.id)}
            />
          </div>

          <div className="plan-details">
            <div className="plan-header">
              <img className="e-avatar-image" src={profileImage} alt="avatar"/>
              <h3 className="e-header-name">{plan.name}</h3>
            </div>
            <p>Age: {plan.age}</p>
            <p>Weight: {plan.weight} kg</p>
            <p>Height: {plan.height} cm</p>
            <h4 className="header-exercise">Exercises</h4>
            <table className="exercise-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Reps</th>
                  <th>Sets</th>
                </tr>
              </thead>
              <tbody>
                {plan.exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>{exercise.name}</td>
                    <td>{exercise.reps}</td>
                    <td>{exercise.sets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlanSharingCard;
