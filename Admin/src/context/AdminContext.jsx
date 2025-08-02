import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/doctors-list`,
        {},
        {
          headers: {
            atoken: aToken,
          },
        }
      );

      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctors/change-availability`,
        { docId },
        {
          headers: {
            atoken: aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: {
          atoken: aToken,
        },
      });
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointments`,
        { appointmentId },
        {
          headers: {
            atoken: aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments(); // ✅ Refresh appointments
      }
    } catch (error) {
      console.error("Cancel appointment error:", error.message);
    }
  };

  const getDashData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });
      const data = res.data;
      console.log("DASH DATA:", data);
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const values = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData,
  };
  return (
    <AdminContext.Provider value={values}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
