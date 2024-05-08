import React, { useState } from 'react';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './status.css';

const ShareStatus = () => {
  const [formData, setFormData] = useState({
    distanceRan: '',
    pushups: '',
    weightLifted: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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

    if (!formData.distanceRan.trim()) {
      newErrors.distanceRan = 'Please enter ingredients';
      isValid = false;
    }

    if (!formData.pushups.trim()) {
      newErrors.pushups = 'Please enter cooking instructions';
      isValid = false;
    }

    if (!formData.weightLifted.trim()) {
      newErrors.weightLifted = 'Please enter a description';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please upload an image';
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
        <h1 className="py-5 text-xl font-bold opacity-90">Status</h1>
      </section>
      <div className="image-container">
        
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Form.Label className="form-label">Distance Ran</Form.Label>
            <Form.Control className="form-input" type="number" name="ingredients" value={formData.ingredients} onChange={handleChange} />
            {errors.distanceRan && <span className="error">{errors.distanceRan}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Pushups Completed</Form.Label>
            <Form.Control className="form-input" type="number" name="instructions" value={formData.instructions} onChange={handleChange} />
            {errors.pushups && <span className="error">{errors.pushups}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Weight Lifted</Form.Label>
            <Form.Control className="form-input" type='number' name="weightLifted" value={formData.weightLifted} onChange={handleChange} rows={4} />
            {errors.weightLifted && <span className="error">{errors.weightLifted}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control className="form-input" as="textarea" value={formData.description} onChange={handleChange} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <Button className="submit-btn" type="submit">Share Status</Button>
        </Form>
      </div>
    </div>
  );
};

export default ShareStatus;
