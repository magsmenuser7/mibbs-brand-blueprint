import axios from "axios";

// ✅ Production Base URL
// const API = "https://api.mibbs.ai/api";
const BASE_URL = "https://api.mibbs.ai/api";


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




export const register = async (username: string, email: string, phone: string, password: string) => {
  return axios.post(
    `${BASE_URL}/register/`,
    { username, email, phone, password },
    { withCredentials: true }
  );
};

export const login = async (email: string, password: string) => {
  return axios.post(
    `${BASE_URL}/login/`,
    { email, password },
    { withCredentials: true }
  );
};

export const saveAssessment = async (assessmentData: any) => {
  return axios.post(
    `${BASE_URL}/assessment/`,
    assessmentData,
    { withCredentials: true }
  );
};