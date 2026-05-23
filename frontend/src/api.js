import axios from 'axios';

const API = 'https://haibazotask2.onrender.com/api'; 

export const api = {
    getAuthors: () => axios.get(`${API}/authors`),
    createAuthor: (data) => axios.post(`${API}/authors`, data),
    updateAuthor: (id, data) => axios.put(`${API}/authors/${id}`, data),
    deleteAuthor: (id) => axios.delete(`${API}/authors/${id}`),

    getBooks: () => axios.get(`${API}/books`),
    createBook: (data) => axios.post(`${API}/books`, data),
    updateBook: (id, data) => axios.put(`${API}/books/${id}`, data),
    deleteBook: (id) => axios.delete(`${API}/books/${id}`),

    getReviews: () => axios.get(`${API}/reviews`),
    createReview: (data) => axios.post(`${API}/reviews`, data),
    updateReview: (id, data) => axios.put(`${API}/reviews/${id}`, data),
    deleteReview: (id) => axios.delete(`${API}/reviews/${id}`),
};