import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  const getDoctorProfile = async () => {
    setProfileLoading(true);
    setProfileError("");
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctors/profile`, {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        setDoctorData(data.doctor);
      } else {
        setProfileError(data.message || "Unable to load profile");
      }
    } catch (error) {
      setProfileError(error.response?.data?.message || "Unable to load profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const updateDoctorProfile = async (profileData) => {
    try {
      const { data } = await axios.patch(`${backendUrl}/api/doctors/profile`, profileData, {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        setDoctorData(data.doctor);
        toast.success("Profile updated successfully");
        return true;
      }
      toast.error(data.message || "Update failed");
      return false;
    } catch (error) {
      if (!error.response) toast.error("Network/API error while updating profile");
      else toast.error(error.response.data?.message || "Update failed");
      return false;
    }
  };

  const getAppointments = async () => {
    setAppointmentsLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctors/appointments`,
        {
          headers: { dtoken: dToken },
        }
      );

      if (data.success) {
        setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Session expired. Please log in again.") {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("dToken");
        setDToken("");
        navigate("/", { replace: true });
      } else {
        toast.error(errorMessage || "Something went wrong");
      }
    } finally {
      setAppointmentsLoading(false);
    }
  };

  const values = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    appointmentsLoading,
    doctorData,
    profileLoading,
    profileError,
    getDoctorProfile,
    updateDoctorProfile,
  };
  return (
    <DoctorContext.Provider value={values}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
