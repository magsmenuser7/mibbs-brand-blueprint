import axios from "axios";

// ✅ Centralized base URL
const API = "https://api.mibbs.ai/api";
// const API = "http://127.0.0.1:8000/api";


export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API}/registerUser`, { name, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API}/login`, { email, password }); // ✅ Fixed to use same base
};

export const logoutUser = async () => {
  return axios.post(`${API}/logout`, {}, {
    withCredentials: true
  });
};

// const API = "http://localhost:5000/api/auth";