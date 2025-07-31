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
  

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctors/appointments`,
        {
          headers: { dtoken: dToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Session expired. Please log in again.") {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("dtoken"); // or your token key
        navigate("/doctor-login"); // or wherever appropriate
      } else {
        toast.error(errorMessage || "Something went wrong");
      }
    }
  };

  const values = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
  };
  return (
    <DoctorContext.Provider value={values}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
