import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sharemealplan.css';
function UpdateMealPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mealData, setMealData] = useState({
    title: '',
    ingredients: '',
    nutritional: '',
    information: '',
    portionSizes: '',
    dietaryPreferences: '',
    imagePath1: ''
  });

  useEffect(() => {
    fetchMealData();
  }, []);

  const fetchMealData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/meal/meal/${id}`);
      setMealData(response.data);
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  const handleChange = (e) => {
    setMealData({ ...mealData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', mealData.title);
      formData.append('ingredients', mealData.ingredients);
      formData.append('nutritional', mealData.nutritional);
      formData.append('information', mealData.information);
      formData.append('portionSizes', mealData.portionSizes);
      formData.append('dietaryPreferences', mealData.dietaryPreferences);
      // Add other fields to formData as needed

      await axios.put(`http://localhost:8080/meal/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Meal updated successfully.'); // Set success message
      
      navigate('/profile'); // Redirect to the main page after saving
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };
  

  return (
    <div className="mainpage">
        <form className='m-form-container'>

      <h1 className="mealheader">Edit Meal</h1>

      <label htmlFor="title" className="m-form-label">Title:</label>
      <input type="text" id="title" name="title" value={mealData.title} onChange={handleChange} /><br />
      <label htmlFor="ingredients" className="m-form-label">Ingredients:</label>
      <input type="text" id="ingredients" name="ingredients" value={mealData.ingredients} onChange={handleChange} /><br />
      <label htmlFor="nutritional" className="m-form-label">Nutritional:</label>
      <input type="text" id="nutritional" name="nutritional" value={mealData.nutritional} onChange={handleChange} /><br />
      <label htmlFor="information" className="m-form-label">Information:</label>
      <input type="text" id="information" name="information" value={mealData.information} onChange={handleChange} /><br />
      <label htmlFor="portionSizes" className="m-form-label">Portion Sizes:</label>
      <input type="text" id="portionSizes" name="portionSizes" value={mealData.portionSizes} onChange={handleChange} /><br />
      <label htmlFor="dietaryPreferences" className="m-form-label">Dietary Preferences:</label>
      <input type="text" id="dietaryPreferences" name="dietaryPreferences" value={mealData.dietaryPreferences} onChange={handleChange} /><br />
      <div className='m-buttons'>
      <button onClick={handleSave} className="m-btn-submit">Save</button>
      </div>
      </form>
    </div>
  );
  
}

export default UpdateMealPlan;
