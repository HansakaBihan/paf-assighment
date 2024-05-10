// import React, { useState } from 'react';
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import { useNavigate } from "react-router-dom";
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import './mealplan.css';
// import axios from 'axios'; // Import axios here
// const Sharemealplan = () => {
//   const [formData, setFormData] = useState({
//     title:'',
//     ingredients: '',    
//     nutritional: '',
//     information:'',
//     portion_sizes: '',
//     dietary_preferences: ' ',
//     imagePath1:'',  
//   });
  
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleBack = () => navigate(-1);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleImageUpload = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//       console.log('Meal Plan Data:', formData);
    
//   };

//   // const validateForm = () => {
//   //   let isValid = true;
//   //   const newErrors = {};

//   //   if (!formData.ingredients.trim()) {
//   //     newErrors.ingredients = 'Please enter ingredients';
//   //     isValid = false;
//   //   }

//   //   if (!formData.instructions.trim()) {
//   //     newErrors.instructions = 'Please enter cooking instructions';
//   //     isValid = false;
//   //   }

//   //   if (!formData.description.trim()) {
//   //     newErrors.description = 'Please enter a description';
//   //     isValid = false;
//   //   }

//   //   if (!formData.file1) {
//   //     newErrors.file1  = 'Please upload an image';
//   //     isValid = false;
//   //   }

//   //   setErrors(newErrors);
//   //   return isValid;
//   // };

  
//   const handleSaveMeal = () => {
//     const { title, ingredients, nutritional, information, portion_sizes, dietary_preferences,imagePath1   } = formData; // Define variables here
//     axios.post('http://localhost:8080/meal/addmeal', {
//       title,
//       ingredients,
//       nutritional,
//       information,
//       portion_sizes,
//       dietary_preferences,
//       imagePath1,
//     })
//     .then(response => {
//       alert('Workout plan saved Successfully');
//       // Optionally, reset form fields or show a success message
//     })
//     .catch(error => {
//       console.error('Error saving workout plan:', error);
//       // Optionally, show an error message
//     });
//   };
  

//   return (
//     <div className="PlanSharing">
//       <section className="flex items-center sticky top-0 bg-opacity-95 px-4">
//         <KeyboardBackspaceIcon
//           className="cursor-pointer"
//           onClick={handleBack}
//         />
//         <h1 className="py-5 text-xl font-bold opacity-90">Meal Plan</h1>
//       </section>
//       <div className="form-container">
//         <Form >
//         <div className="mb-4">
//             <Form.Label className="form-label">Title</Form.Label>
//             <Form.Control className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} />
//             {errors.title && <span className="error">{errors.title}</span>}
//           </div>
//           <div className="mb-4">
//             <Form.Label className="form-label">Ingredients</Form.Label>
//             <Form.Control className="form-input" type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
//             {errors.ingredients && <span className="error">{errors.ingredients}</span>}
//           </div>
//           <div className="mb-4">
//             <Form.Label className="form-label">Nutritional</Form.Label>
//             <Form.Control className="form-input" type="text" name="nutritional" value={formData.nutritional} onChange={handleChange} />
//             {errors.nutritional && <span className="error">{errors.nutritional}</span>}
//           </div>
//           <div className="mb-4">
//             <Form.Label className="form-label">information</Form.Label>
//             <Form.Control className="form-input" type="text" name="information" value={formData.information} onChange={handleChange} />
//             {errors.information && <span className="error">{errors.information}</span>}
//           </div>
//           <div className="mb-4">
//             <Form.Label className="form-label">portion_sizes</Form.Label>
//             <Form.Control className="form-input" as="textarea" name="portion_sizes" value={formData.portion_sizes} onChange={handleChange} rows={4} />
//             {errors.portion_sizes && <span className="error">{errors.portion_sizes}</span>}
//           </div>
//           <div className="mb-4">
//             <Form.Label className="form-label">dietary_preferences</Form.Label>
//             <Form.Control className="form-input" as="textarea" name="dietary_preferences" value={formData.dietary_preferences} onChange={handleChange} rows={4} />
//             {errors.dietary_preferences && <span className="error">{errors.dietary_preferences}</span>}
//           </div>
//           <div className="mb-4">
//             <Form.Label className="form-label">Upload Image</Form.Label>
//             <Form.Control className="form-input" type="file" onChange={handleImageUpload} />
//             {errors.image && <span className="error">{errors.image}</span>}
//           </div> 
//           <button type="button" onClick={handleSaveMeal} className="btn-submit">Share Meal Plan</button>
//         </Form>
//       </div>
//     </div> 
//   );
// };

// export default Sharemealplan;
import React, { useState } from 'react';
import axios from 'axios';

function Sharemealplan() {


  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    nutritional: '',
    information: '',
    portionSizes: '',
    dietaryPreferences: '',
    file1: null // For file upload
  });

  const handleChange = (e) => {
    if (e.target.name === 'file1') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, ingredients, nutritional, information, portionSizes, dietaryPreferences, file1 } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append('title', title);
      formDataToSend.append('ingredients', ingredients);
      formDataToSend.append('nutritional', nutritional);
      formDataToSend.append('information', information);
      formDataToSend.append('portionSizes', portionSizes);
      formDataToSend.append('dietaryPreferences', dietaryPreferences);
      formDataToSend.append('file1', file1); // Append file to FormData

      // Send POST request with FormData
      await axios.post('http://localhost:8080/meal/addmeal', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form data after successful submission
      setFormData({
        title: '',
        ingredients: '',
        nutritional: '',
        information: '',
        portionSizes: '',
        dietaryPreferences: '',
        file1: null
      });

      // Show alert
      alert('Meal added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add meal. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br />

      <label htmlFor="ingredients">Ingredients:</label>
      <textarea id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required /><br />

      <label htmlFor="nutritional">Nutritional:</label>
      <input type="text" id="nutritional" name="nutritional" value={formData.nutritional} onChange={handleChange} required /><br />

      <label htmlFor="information">Information:</label>
      <textarea id="information" name="information" value={formData.information} onChange={handleChange} required /><br />

      <label htmlFor="portionSizes">Portion Sizes:</label>
      <input type="text" id="portionSizes" name="portionSizes" value={formData.portionSizes} onChange={handleChange} required /><br />

      <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
      <input type="text" id="dietaryPreferences" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} required /><br />

      <label htmlFor="file1">File 1:</label>
      <input type="file" id="file1" name="file1" onChange={handleChange} required /><br />

      <button type="submit">Save</button>
    </form>
  );
}


export default Sharemealplan;
