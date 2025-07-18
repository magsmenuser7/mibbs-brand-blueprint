import axios from "axios";

// ✅ Production Base URL
const API = "https://api.mibbs.ai/api";

export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API}/registerUser`, { name, email, password }, {
    withCredentials: true
  });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API}/login`, { email, password }, {
    withCredentials: true
  });
};

export const logoutUser = async () => {
  return axios.post(`${API}/logout`, {}, {
    withCredentials: true
  });
};

// const API = "http://localhost:5000/api/auth";