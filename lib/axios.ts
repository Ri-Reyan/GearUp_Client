import axios from "axios";

export const getApiBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  return "https://gearup-htvu.onrender.com";
};

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
