
// import React, { useState } from 'react';
// import axios from 'axios';

// function Sharemealplan() {
  

//   const [formData, setFormData] = useState({
//     title: '',
//     ingredients: '',
//     nutritional: '',
//     information: '',
//     portionSizes: '',
//     dietaryPreferences: '',
//     file1: null // For file upload
//   });

//   const handleChange = (e) => {
//     if (e.target.name === 'file1') {
//       setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { title, ingredients, nutritional, information, portionSizes, dietaryPreferences, file1 } = formData;
//       const formDataToSend = new FormData();
//       formDataToSend.append('title', title);
//       formDataToSend.append('ingredients', ingredients);
//       formDataToSend.append('nutritional', nutritional);
//       formDataToSend.append('information', information);
//       formDataToSend.append('portionSizes', portionSizes);
//       formDataToSend.append('dietaryPreferences', dietaryPreferences);
//       formDataToSend.append('file1', file1); // Append file to FormData

//       // Send POST request with FormData
//       await axios.post('http://localhost:8080/meal/addmeal', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Reset form data after successful submission
//       setFormData({
//         title: '',
//         ingredients: '',
//         nutritional: '',
//         information: '',
//         portionSizes: '',
//         dietaryPreferences: '',
//         file1: null
//       });

//       // Show alert
//       alert('Meal added successfully!');

     
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to add meal. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="title">Title:</label>
//       <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br />

//       <label htmlFor="ingredients">Ingredients:</label>
//       <textarea id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required /><br />

//       <label htmlFor="nutritional">Nutritional:</label>
//       <input type="text" id="nutritional" name="nutritional" value={formData.nutritional} onChange={handleChange} required /><br />

//       <label htmlFor="information">Information:</label>
//       <textarea id="information" name="information" value={formData.information} onChange={handleChange} required /><br />

//       <label htmlFor="portionSizes">Portion Sizes:</label>
//       <input type="text" id="portionSizes" name="portionSizes" value={formData.portionSizes} onChange={handleChange} required /><br />

//       <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
//       <input type="text" id="dietaryPreferences" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} required /><br />

//       <label htmlFor="file1">File 1:</label>
//       <input type="file" id="file1" name="file1" onChange={handleChange} required /><br />

//       <button type="submit">Save</button>
//     </form>
//   );
// }


// export default Sharemealplan;


import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './sharemealplan.css'; // Import your CSS file here


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
     // resetForm();

      // Show alert
      alert('Meal added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add meal. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      ingredients: '',
      nutritional: '',
      information: '',
      portionSizes: '',
      dietaryPreferences: '',
      file1: null
    });
  };
  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // Set font style
    pdf.setFont('times');
  
    // Set font size
    pdf.setFontSize(12);
  
    const { title, ingredients, nutritional, information, portionSizes, dietaryPreferences, file1 } = formData;
  
    // Add title
    pdf.setTextColor(31, 73, 125); // Set text color to dark blue
    pdf.setFontSize(20); // Set font size to 20
    pdf.text(title, 15, 20, { align: 'center' });
  
    // Add ingredients
    pdf.setTextColor(0); // Set text color to black
    pdf.setFontSize(14); // Set font size to 14
    pdf.text("Ingredients:", 15, 40);
    pdf.setFontSize(12); // Reset font size
    pdf.text(ingredients, 15, 50);
  
    // Add nutritional information
    pdf.text("Nutritional:", 15, 70);
    pdf.text(nutritional, 15, 80);
  
    // Add additional information
    pdf.text("Information:", 15, 100);
    pdf.text(information, 15, 110);
  
    // Add portion sizes
    pdf.text("Portion Sizes:", 15, 130);
    pdf.text(portionSizes, 15, 140);
  
    // Add dietary preferences
    pdf.text("Dietary Preferences:", 15, 160);
    pdf.text(dietaryPreferences, 15, 170);
  
    // Assuming file1 is an image file
    if (file1) {
      const reader = new FileReader();
      reader.readAsDataURL(file1);
      reader.onloadend = () => {
        const imageData = reader.result;
        pdf.addImage(imageData, 'JPEG', 15, 190, 80, 80); // Adjust coordinates and dimensions as needed
        pdf.save('meal.pdf');
      };
    } else {
      pdf.save('meal.pdf');
    }
  };
  
  

  return (
    <div className="mainpage">
    <form className="m-form-container">
      <h1 className="mealheader">MEAL PLAN</h1>

      <label htmlFor="title" className="m-form-label">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="m-form-input" required /><br />
  
      <label htmlFor="ingredients" className="m-form-label">Ingredients:</label>
      <textarea id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} className="m-form-input" required /><br />
  
      <label htmlFor="nutritional" className="m-form-label">Nutritional:</label>
      <textarea id="nutritional" name="nutritional" value={formData.nutritional} onChange={handleChange} className="m-form-input" required /><br />
  
      <label htmlFor="information" className="m-form-label">Information:</label>
      <textarea id="information" name="information" value={formData.information} onChange={handleChange} className="m-form-input" required /><br />
  
      {/* <label htmlFor="portionSizes" className="m-form-label">Portion Sizes:</label>
      <input type="text" id="portionSizes" name="portionSizes" value={formData.portionSizes} onChange={handleChange} className="m-form-input" required /><br />
     */}
      <label htmlFor="portionSizes" className="m-form-label">Portion Sizes:</label>
      <select id="portionSizes" name="portionSizes" value={formData.dropdownValue} onChange={handleChange} className="m-form-input">
        <option value="">Select a Portion Size</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        </select>
      <label htmlFor="dietaryPreferences" className="m-form-label">Dietary Preferences:</label>
      <input type="text" id="dietaryPreferences" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} className="m-form-input" required /><br />
  
   {/* <label htmlFor="dietaryPreferences" className="m-form-label">Dietary Preferences:</label>
      <select id="dietaryPreferences" name="dietaryPreferences" value={formData.dropdownValue} onChange={handleChange} className="m-form-input">
        <option value="">Select a dietary preference</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Gluten-Free">Gluten-Free</option>
        <option value="Dairy-Free">Dairy-Free</option>
      
      </select> */}
      <label htmlFor="file1" className="m-form-label">File 1:</label>
      <input type="file" id="file1" name="file1" onChange={handleChange} className="m-form-input" required /><br />
  
      <div className='m-buttons'>
      <button type="button" className="m-btn-submit" onClick={handleSubmit}>Save</button>
      <button type="button" onClick={generatePDF} className="m-btn-submit">Generate PDF</button>
      </div>
    </form>
    </div>
  );
}

export default Sharemealplan;
