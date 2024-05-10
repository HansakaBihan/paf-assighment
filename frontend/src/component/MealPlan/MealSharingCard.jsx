
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './MealSharingCard.css';
import DeleteIcon from './deleteBtn.png'
import EditIcon from './editBtn.png'

function MealSharingCard() {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/meal/getmeal');
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this meal?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/meal/delete/${id}`);
        setMeals(meals.filter(meal => meal.id !== id));
      } catch (error) {
        console.error('Error deleting meal:', error);
      }
    }
  };

 

  return (
    <div className="plan-list">
      
      <h1>Shared Meals</h1>
      {meals.map(meal => (
        <div key={meal.id} className='plan-item'>
          <div className="edit-delete-btn">
      <img
        src={DeleteIcon}
        alt="Delete"
        className="e-delete-icon"
        height="20px"
        width="20px"
        onClick={() => handleDelete(meal.id)}
      />

          <img
        src={EditIcon}
        alt="Edit"
        className="e-edit-icon"
        height="20px"
        width="20px"
        onClick={() => handleUpdate(meal.id)}
      />
      </div>
           <div className="plan-details">
           
          <h3 className='e-header-name'>{meal.title}</h3>
          <p>Ingredients: {meal.ingredients}</p>
          <p>Nutritional: {meal.nutritional}</p>
          <p>Information: {meal.information}</p>
          <p>Portion Sizes: {meal.portionSizes}</p>
          <p>Dietary Preferences: {meal.dietaryPreferences}</p>
          <div>
            <img src={`http://localhost:8080/uploads/${meal.imagePath1}`} alt="Meal" className="meal-image" />
          </div>

          

    </div>
          {/* <button onClick={() => handleDelete(meal.id)}>Delete</button>
         <button onClick={() => handleUpdate(meal.id)}>Update</button>
       </div> */}
       </div>
       
      ))}
    </div>
  );
}

export default MealSharingCard;
