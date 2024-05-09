import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:8000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const { logoutUser } = useAuth();
  // const navigate = useNavigate();

  axiosSecure.interceptors.response.use(
    (config) => {
      //   console.log("Request Sent", config);

      return config;
    },

    async (error) => {
      console.log("Request Error", error);
      // if (error.response.status === 401 || error.response.status === 403) {
      //   await logoutUser();
      //   navigate("/login");
      // }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
