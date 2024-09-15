import React, { useState } from 'react';
import { registerUser } from '../api'; 

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({}); // State for validation errors
  const [error, setError] = useState(''); // State for general error message
  const [success, setSuccess] = useState(''); // State for success message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors
      return;
    }
    setError(''); // Reset error message
    setSuccess(''); // Reset success message
    try {
      await registerUser(form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page after success
      }, 2000); 
    } catch (error) {
      
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <div className="alert alert-danger">{error}</div>} 
      {success && <div className="alert alert-success">{success}</div>} 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
          />
          {errors.username && <div style={{ color: '#c62828' }}>{errors.username}</div>} 
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
          />
          {errors.password && <div style={{ color: '#c62828' }}>{errors.password}</div>} 
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
