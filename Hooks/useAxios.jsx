import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assignment11-beta.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
