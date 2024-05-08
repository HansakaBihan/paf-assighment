// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import './workoutplan.css'; // Import your CSS file here
// import DeleteIcon from './deleteBtn.png';
// import AddIcon from './plusBtn.png' 


// const WorkoutForm = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [weight, setWeight] = useState('');
//   const [height, setHeight] = useState('');
//   const [exercises, setExercises] = useState([{ exercise: '', reps: '', sets: '' }]);

//   const handleAddExercise = () => {
//     setExercises([...exercises, { exercise: '', reps: '', sets: '' }]);
//   };

//   const handleExerciseChange = (index, field, value) => {
//     const updatedExercises = [...exercises];
//     updatedExercises[index][field] = value;
//     setExercises(updatedExercises);
//   };

//   const handleDeleteExercise = (index) => {
//     const updatedExercises = [...exercises];
//     updatedExercises.splice(index, 1);
//     setExercises(updatedExercises);
//   };

//   const handleSaveWorkout = () => {
//     // Logic to save workout plan
//     console.log('Workout plan saved:', { name, age, weight, height, exercises });
//   };

//   const handleDownloadPDF = () => {
//     // Logic to generate and download PDF
//     const doc = new jsPDF();
//     doc.text(20, 20, `Workout Plan: ${name}`);
//     doc.text(20, 30, `Date: ${new Date().toLocaleDateString()}`);
//     doc.text(20, 40, `Age: ${age}`);
//     doc.text(20, 50, `Weight: ${weight}`);
//     doc.text(20, 60, `Height: ${height}`);
//     doc.text(20, 70, 'Exercises:');
//     exercises.forEach((exercise, index) => {
//       doc.text(30, 80 + index * 10, `${index + 1}. ${exercise.exercise}: ${exercise.reps} reps, ${exercise.sets} sets`);
//     });
//     doc.save('workout_plan.pdf');
//   };

//   return (
//     <div className="PlanSharing"> {/* Add your container class here */}
//       <div className="form-container"> {/* Add your form container class here */}
//         <h2 className='meal-plan-form .head h2'>Create New Workout Plan</h2>
//         <form className="form-sec workout-form"> {/* Add your form class here */}
//           <div className="form-group"> {/* Add your form group class here */}
//             <label htmlFor="name" className="form-label">Name:</label> {/* Add your label class here */}
//             <input
//               type="text"
//               id="name"
//               className="form-input" // Add your input class here
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="age" className="form-label">Age:</label>
//             <input
//               type="number"
//               id="age"
//               className="form-input"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="weight" className="form-label">Weight(kg):</label>
//             <input
//               type="number"
//               id="weight"
//               className="form-input"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="height" className="form-label">Height(cm):</label>
//             <input
//               type="number"
//               id="height"
//               className="form-input"
//               value={height}
//               onChange={(e) => setHeight(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <table className="exercise-table">
//               <thead>
//                 <tr>
//                   <th>Exercise</th>
//                   <th>Reps</th>
//                   <th>Sets</th>
                  
//                 </tr>
//               </thead>
//               <tbody>
//                 {exercises.map((exercise, index) => (
//                   <tr key={index}>
//                     <td>
//                       <input
//                         type="text"
//                         value={exercise.exercise}
//                         onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
//                         className="form-input" // Add your input class here
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={exercise.reps}
//                         onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
//                         className="form-input" // Add your input class here
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={exercise.sets}
//                         onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
//                         className="form-input" // Add your input class here
//                       />
//                     </td>
//                     <td>
//                         <button type="button" onClick={() => handleDeleteExercise(index)} className="delete-btn">
//                             <img src={DeleteIcon} alt="Delete" className="delete-icon" height="20px" width="20px"/> {/* Add your img tag here */}
//                         </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//                         <button type="button" onClick={handleAddExercise} className="plus-btn">
//                             <img src={AddIcon} alt="Add" className="plus-icon" height="30px" width="30px"/> {/* Add your img tag here */}
//                         </button>          
//             </div>
//           <div>
//             <button type="button" onClick={handleSaveWorkout} className="submit-btn">Save Workout Plan</button> {/* Add your button class here */}
//             <button type="button" onClick={handleDownloadPDF} className="submit-btn">Download as PDF</button> {/* Add your button class here */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default WorkoutForm;
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import './workoutplan.css'; // Import your CSS file here
import DeleteIcon from './deleteBtn.png';
import AddIcon from './plusBtn.png';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";


const WorkoutForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [exercises, setExercises] = useState([{ exercise: '', reps: '', sets: '' }]);

  const handleAddExercise = () => {
    setExercises([...exercises, { exercise: '', reps: '', sets: '' }]);
  };
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);


  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const handleDeleteExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const handleSaveWorkout = () => {
    axios.post('http://localhost:8070/api/workout-plans/api/workout/save', {
      name,
      age,
      weight,
      height,
      exercises
    })
    .then(response => {
      console.log('Workout plan saved:', response.data);
      // Optionally, reset form fields or show a success message
    })
    .catch(error => {
      console.error('Error saving workout plan:', error);
      // Optionally, show an error message
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Set font size and style
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    
    // Set text color
    doc.setTextColor(0, 0, 0);
    
    // Add text with custom styling
    doc.text(20, 20, `Workout Plan: ${name}`);

    doc.text(20, 20, `Workout Plan: ${name}`);
    doc.setFontSize(12);
    doc.text(20, 30, `Date: ${new Date().toLocaleDateString()}`);
    doc.text(20, 40, `Age: ${age}`);
    doc.text(20, 50, `Weight: ${weight} kg`);
    doc.text(20, 60, `Height: ${height} cm`);
    // Reset font and color
   
    // Add other content (e.g., date, age, weight, height)
    // Same as before
    
    // Set font size for table headers
    doc.setFontSize(12);
    
    // Add table headers with background color
    doc.setFillColor(200, 200, 200);
    doc.rect(20, 70, 170, 10, 'F');
    doc.text(30, 75, 'Exercise');
    doc.text(80, 75, 'Reps');
    doc.text(120, 75, 'Sets');
    
    // Add table content with alternating row colors
    let startY = 80;
    let rowColor = false;
    exercises.forEach((exercise, index) => {
      doc.setFillColor(rowColor ? 255 : 240, 240, 240);
      doc.rect(20, startY, 170, 10, 'F');
      doc.text(30, startY + 5, exercise.exercise);
      doc.text(80, startY + 5, exercise.reps);
      doc.text(120, startY + 5, exercise.sets);
      startY += 10;
      rowColor = !rowColor;
    });
    
    // Save the PDF
    doc.save('workout_plan.pdf');
  };
  

  return (
    <div className="PlanSharing">
      <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
      <div className="form-container">
      
        <h2 className='meal-plan-form .head h2'>Create New Workout Plan</h2>
        
        <form className="form-sec workout-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age" className="form-label">Age:</label>
            <input
              type="number"
              id="age"
              className="form-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight" className="form-label">Weight(kg):</label>
            <input
              type="number"
              id="weight"
              className="form-input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height" className="form-label">Height(cm):</label>
            <input
              type="number"
              id="height"
              className="form-input"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div>
            <table className="exercise-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Reps</th>
                  <th>Sets</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={exercise.exercise}
                        onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteExercise(index)} className="delete-btn">
                        <img src={DeleteIcon} alt="Delete" className="delete-icon" height="20px" width="20px"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddExercise} className="plus-btn">
              <img src={AddIcon} alt="Add" className="plus-icon" height="30px" width="30px"/>
            </button>
          </div>
          <div>
            <button type="button" onClick={handleSaveWorkout} className="submit-btn">Save Workout Plan</button>
            <button type="button" onClick={handleDownloadPDF} className="submit-btn">Download as PDF</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;
