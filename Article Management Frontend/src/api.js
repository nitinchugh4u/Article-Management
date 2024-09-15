import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to get the token from local storage
const getToken = () => localStorage.getItem('token');

// Function to create headers with token
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const fetchArticles = () => axios.get(`${API_URL}/articles`, getHeaders());
export const addArticle = (article) => axios.post(`${API_URL}/articles`, article, getHeaders());
export const likeArticle = (id) => axios.post(`${API_URL}/articles/like/${id}`, {}, getHeaders());
export const updateArticle = (id, article) => axios.put(`${API_URL}/articles/${id}`, article, getHeaders());
export const deleteArticle = (id) => axios.delete(`${API_URL}/articles/${id}`, getHeaders());
export const registerUser = (user) => axios.post(`${API_URL}/users/register`, user);
export const loginUser = (user) => axios.post(`${API_URL}/users/login`, user);
