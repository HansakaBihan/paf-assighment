import React, { useState } from 'react';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './mealplan.css';

const Sharemealplan = () => {
  const [formData, setFormData] = useState({
    ingredients: '',
    instructions: '',
    description: '',
    image: null,
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Meal Plan Data:', formData);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Please enter ingredients';
      isValid = false;
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Please enter cooking instructions';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = 'Please upload an image';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="PlanSharing">
      <section className="flex items-center sticky top-0 bg-opacity-95 px-4">
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90">Meal Plan</h1>
      </section>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Form.Label className="form-label">Ingredients</Form.Label>
            <Form.Control className="form-input" type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
            {errors.ingredients && <span className="error">{errors.ingredients}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Cooking Instructions</Form.Label>
            <Form.Control className="form-input" type="text" name="instructions" value={formData.instructions} onChange={handleChange} />
            {errors.instructions && <span className="error">{errors.instructions}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control className="form-input" as="textarea" name="description" value={formData.description} onChange={handleChange} rows={4} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Upload Image</Form.Label>
            <Form.Control className="form-input" type="file" onChange={handleImageUpload} />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <Button className="submit-btn" type="submit">SHARE MEAL PLAN</Button>
        </Form>
      </div>
    </div>
  );
};

export default Sharemealplan;
