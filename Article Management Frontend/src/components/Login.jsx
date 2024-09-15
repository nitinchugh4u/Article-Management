import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({}); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

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
      setErrors(validationErrors); 
      return;
    }
    setError(''); 
    setSuccess(''); 
    try {
      const response = await loginUser(form);
      localStorage.setItem('token', response.data.token);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/'; // Redirect on successful login
      }, 2000); 
    } catch (error) {
      // Display error message
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
