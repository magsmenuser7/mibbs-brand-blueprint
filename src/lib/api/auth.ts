import axios from "axios";

// ✅ Production Base URL
const API = "http://127.0.0.1:8000/api";


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




export const loginWithGoogle = async (credential: string) => {
  return axios.post(
    `${API}/auth/google-login/`,
    { credential },
    { withCredentials: true }
  );
};

// const API = "http://localhost:5000/api/auth";