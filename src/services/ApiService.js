import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getProjects = async () => {
    return await axios.get(`${API_URL}/posts`); // Menggunakan 'posts' sebagai pengganti 'projects'
};

export const getProjectDetails = async (projectId) => {
    return await axios.get(`${API_URL}/posts/${projectId}`);
};

export const createProject = async (project) => {
    return await axios.post(`${API_URL}/posts`, project);
};

export const updateProject = async (projectId, updatedProject) => {
    return await axios.put(`https://jsonplaceholder.typicode.com/posts/${projectId}`, updatedProject);
};

export const deleteProject = async (projectId) => {
    return await axios.delete(`${API_URL}/posts/${projectId}`);
};

export const getTasks = async (projectId) => {
    return await axios.get(`${API_URL}/posts/${projectId}/comments`);
};

export const createTask = async (projectId, task) => {
    return await axios.post(`${API_URL}/posts/${projectId}/comments`, task);
};

export const updateTask = async (taskId, updatedTask) => {
    return await axios.put(`${API_URL}/comments/${taskId}`, updatedTask);
};

export const deleteTask = async (taskId) => {
    return await axios.delete(`${API_URL}/comments/${taskId}`);
};
