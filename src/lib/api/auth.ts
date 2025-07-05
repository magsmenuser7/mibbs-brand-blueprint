import axios from "axios";

// ✅ Centralized base URL
const API = "https://api.mibbs.ai/";



export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API}api/registerUser`, { name, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API}api/login`, { email, password }); // ✅ Fixed to use same base
};


// const API = "http://localhost:5000/api/auth";