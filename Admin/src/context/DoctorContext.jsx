import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const DoctorContext = createContext();


const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData , setDashData] = useState(false)

const getAppointments = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctors/appointments`, {
      headers: { dtoken: dToken }, // ✅ Use lowercase "dtoken"
    });

    if (data.success) {
      setAppointments(data.appointments);
      console.log("Appointments:", data.appointments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    if (errorMessage === "Session expired. Please log in again.") {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("dtoken");
      window.location.href = "/doctor-login"; // ✅ Use this instead of navigate inside context
    } else {
      toast.error(errorMessage || "Something went wrong");
    }
  }
};

const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/doctors/complete-appointment`,
      { appointmentId },
      {
        headers: { dtoken: dToken },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/doctors/cancel-appointment`,
      { appointmentId },
      {
        headers: { dtoken: dToken },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const getDashData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctors/dashboard`, {
      headers: { dtoken: dToken },
    });
    
    console.log("Raw dashboard response:", data);
    if (data.success) {
     setDashData(data.dashData)
     console.log(data.dashData);
     
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  const values = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,setDashData,getDashData
  };
  return (
    <DoctorContext.Provider value={values}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
