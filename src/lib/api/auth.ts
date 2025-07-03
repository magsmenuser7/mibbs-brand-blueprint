import axios from "axios";

// ✅ Centralized base URL
// const API = "https://api.mibbs.ai/api/auth";



const API = import.meta.env.VITE_API_URL;

export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API}/register`, { name, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API}/login`, { email, password }); // ✅ Fixed to use same base
};


// const API = "http://localhost:5000/api/auth";