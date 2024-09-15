import React, { useState } from 'react';
import { addArticle } from '../api';

const ArticleForm = () => {
  const [form, setForm] = useState({
    title: '',
    image: '',
    video: '',
    description: '',
    text: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.image) newErrors.image = 'Image URL is required';
    if (!form.video) newErrors.video = 'Video URL is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.text) newErrors.text = 'Article text is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await addArticle(form);
      setForm({
        title: '',
        image: '',
        video: '',
        description: '',
        text: ''
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
          />
          {errors.title && <div style={{ color: '#c62828' }}>{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input 
            type="text" 
            className="form-control" 
            id="image" 
            name="image" 
            value={form.image} 
            onChange={handleChange} 
          />
          {errors.image && <div style={{ color: '#c62828' }}>{errors.image}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="video" className="form-label">Video URL</label>
          <input 
            type="text" 
            className="form-control" 
            id="video" 
            name="video" 
            value={form.video} 
            onChange={handleChange} 
          />
          {errors.video && <div style={{ color: '#c62828' }}>{errors.video}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
          />
          {errors.description && <div style={{ color: '#c62828' }}>{errors.description}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Article Text</label>
          <textarea 
            className="form-control" 
            id="text" 
            name="text" 
            value={form.text} 
            onChange={handleChange} 
          />
          {errors.text && <div style={{ color: '#c62828' }}>{errors.text}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ArticleForm;
