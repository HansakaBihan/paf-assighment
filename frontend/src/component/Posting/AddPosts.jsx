import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './post.css';

const AddPosts = () => {
  const [formData, setFormData] = useState({
    description: '',
    file1: '',
    file2: '',
    file3: null,
    video: null,
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


    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
      isValid = false;
    }

    if (!formData.file1) {
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
        <h1 className="py-5 text-xl font-bold opacity-90">Post Sharing</h1>
      </section>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <Form.Label className="form-label">Upload Image</Form.Label>
            <Form.Control className="form-input" type="file" onChange={handleImageUpload} />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <div className="mb-4">
            <Form.Label className="form-label">Upload Image</Form.Label>
            <Form.Control className="form-input" type="file" onChange={handleImageUpload} />
            {errors.image && <span className="error">{errors.image}</span>}
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

export default AddPosts;
