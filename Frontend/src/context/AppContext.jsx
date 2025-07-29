import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

 console.log("Token from localStorage:", token);

  const [userData, setUserData] = useState(null);

  const currencySymbol = "$";

  // Set axios header automatically
  axios.interceptors.request.use((config) => {
    const localToken = localStorage.getItem("token");
    if (localToken) config.headers.token = localToken;
    return config;
  });

  //  Get doctors data
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctors/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      toast.error("Failed to fetch doctors");
    }
  };

  //  Load user profile
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
      headers: {
        token: localStorage.getItem("token"), // ✅ Correct way
      },
    });   if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error?.response?.status === 401) {
        const errorMsg = error.response?.data?.message;
        if (errorMsg === "Token expired") {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Unauthorized. Please login.");
        }

        localStorage.removeItem("token");
        setToken(null);
        setUserData(null);
        navigate("/login");
      } else {
        toast.error("Something went wrong while fetching profile.");
      }
    }
  };

  //  useEffect on mount
  useEffect(() => {
    getDoctorsData();

    if (token) {
      loadUserData();
    } else {
      setUserData(null);
    }
  }, [token]); 

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
