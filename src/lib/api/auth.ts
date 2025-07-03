import axios from "axios";

const API = "http://localhost:5000/api/auth";


// const API = "https://my-auth-api.onrender.com/api/auth";

export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API}/register`, { name, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post("http://localhost:5000/api/auth/login", { email, password });
};
