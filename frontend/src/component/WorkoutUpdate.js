import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateWorkoutForm() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/workout-plans/workout-plans/${id}`)
      .then(response => {
        setWorkoutPlan(response.data);
      })
      .catch(error => {
        console.error('Error fetching workout plan:', error);
      });
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutPlan(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleExerciseChange = (e, index) => {
    const { name, value } = e.target;
    setWorkoutPlan(prevState => {
      const updatedExercises = [...prevState.exercises];
      updatedExercises[index][name] = value;
      return { ...prevState, exercises: updatedExercises };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/workout-plans/update`, workoutPlan)
      .then(response => {
        alert('Workout plan updated successfully:');
        // If you want to update the state with the response data,
        // you can set the workoutPlan state with the updated data
        setWorkoutPlan(response.data);
        // Redirect or show a success message
      })
      .catch(error => {
        console.error('Error updating workout plan:', error);
        // Handle errors
      });
  };

  // Render loading indicator if workoutPlan is null
  if (!workoutPlan) {
    return <div>Loading...</div>;
  }

//   return (
//     <div>
//       <h2>Update Workout Plan</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input type="text" name="name" value={workoutPlan.name} onChange={handleChange} />

//         <label>Age:</label>
//         <input type="number" name="age" value={workoutPlan.age} onChange={handleChange} />

//         <label>Weight:</label>
//         <input type="number" name="weight" value={workoutPlan.weight} onChange={handleChange} />

//         <label>Height:</label>
//         <input type="number" name="height" value={workoutPlan.height} onChange={handleChange} />

//         <label>Exercises:</label>
//         {workoutPlan.exercises.map((exercise, index) => (
//           <div key={index}>
//             <input type="text" name="name" value={exercise.name} onChange={(e) => handleExerciseChange(e, index)} />
//             <input type="text" name="reps" value={exercise.reps} onChange={(e) => handleExerciseChange(e, index)} />
//             <input type="number" name="sets" value={exercise.sets} onChange={(e) => handleExerciseChange(e, index)} />
//           </div>
//         ))}

//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );

return (
    <div className="WorkoutPlanSharing">
      <div className="w-form-container">
        <h2 className='w-header'>Update Workout Plan</h2>
        <form className="w-form-sec workout-form" onSubmit={handleSubmit}>
          <div className="w-form-group">
            <label htmlFor="name" className="w-form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="w-form-input"
              name="name"
              value={workoutPlan.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-form-group">
            <label htmlFor="age" className="w-form-label">Age:</label>
            <input
              type="number"
              id="age"
              className="w-form-input"
              name="age"
              value={workoutPlan.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-form-group">
            <label htmlFor="weight" className="w-form-label">Weight:</label>
            <input
              type="number"
              id="weight"
              className="w-form-input"
              name="weight"
              value={workoutPlan.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-form-group">
            <label htmlFor="height" className="w-form-label">Height:</label>
            <input
              type="number"
              id="height"
              className="w-form-input"
              name="height"
              value={workoutPlan.height}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="w-form-label">Exercises</label>
            <table className="w-exercise-table">
            <thead>
                <tr>
                <th>Exercise</th>
                  <th>Reps</th>
                  <th>Sets</th>
                </tr>
              </thead>
              <tbody>
            {workoutPlan.exercises.map((exercise, index) => (
              <tr key={index} className="w-exercise-item">
                <td>
                <input
                  type="text"
                  className="w-form-input"
                  name="name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(e, index)}
                />
                </td>
                <td>
                <input
                  type="text"
                  className="w-form-input"
                  name="reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(e, index)}
                />
                </td>
                <td>
                <input
                  type="number"
                  className="w-form-input"
                  name="sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(e, index)}
                />
                </td>
              </tr>
            ))}
            </tbody>
            </table>
          </div>
          <button type="submit" className="w-btn-submit">Update</button>
        </form>
      </div>
    </div>
  );
  
};

export default UpdateWorkoutForm;
