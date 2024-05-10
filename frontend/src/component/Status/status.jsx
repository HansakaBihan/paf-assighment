import React, { useState } from 'react';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './status.css';
import Swal from 'sweetalert2';

const ShareStatus = () => {
  const [formData, setFormData] = useState({
    distanceRan: '',
    pushupsCompleted: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/status/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          console.log('Form Data:', formData);
          Swal.fire({
            icon: 'success',
            title: 'Status Shared Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          setFormData({
            distanceRan: '',
            pushupsCompleted: '',
            weightLifted: '',
            description: ''
          });
        } else {
          console.error('Failed to share status:', response.statusText);
        }
      } catch (error) {
        console.error('Error sharing status:', error.message);
      }
    }
  };
  
  

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.distanceRan.trim()) {
      newErrors.distanceRan = 'Please enter the distance that you ran';
      isValid = false;
    }

    if (!formData.pushupsCompleted.trim()) {
      newErrors.pushupsCompleted = 'Please enter the number of pushups';
      isValid = false;
    }

    if (!formData.weightLifted.trim()) {
      newErrors.weightLifted = 'Please enter maximum weight lifted';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Enter a description of your current status';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="PlanSharing" style={{ backgroundImage: "./status.jpg" }}>
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
            <Form.Label className="form-label">Distance Ran (Km)</Form.Label>
            <Form.Control className="form-input" type="number" name="distanceRan" value={formData.distanceRan} onChange={handleChange} />
            {errors.distanceRan && <span className="error">{errors.distanceRan}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Pushups Completed (Nos)</Form.Label>
            <Form.Control className="form-input" type="number" name="pushupsCompleted" value={formData.pushupsCompleted} onChange={handleChange} />
            {errors.pushupsCompleted && <span className="error">{errors.pushupsCompleted}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Weight Lifted (Kg)</Form.Label>
            <Form.Control className="form-input" type='number' name="weightLifted" value={formData.weightLifted} onChange={handleChange} rows={4} />
            {errors.weightLifted && <span className="error">{errors.weightLifted}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control className="form-input" as="textarea" name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <Button className="submit-btn" type="submit">Share Status</Button>
        </Form>
      </div>
    </div>
  );
};

export default ShareStatus;
