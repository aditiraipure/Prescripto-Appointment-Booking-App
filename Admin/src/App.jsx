import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import DashBoard from "./pages/Admin/DashBoard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import { AdminContext } from "./context/AdminContext.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorDashBoard from "./pages/Doctor/DoctorDashBoard.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import DoctorLayout from "./components/Doctor/DoctorLayout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <Login />
      </>
    );
  }

  if (aToken) {
    return (
      <div className="h-screen overflow-hidden bg-[#F2F3FF] flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} />
        <NavBar />
        <div className="flex flex-1 min-h-0">
          <SideBar />
          <main className="flex-1 min-w-0 overflow-y-auto bg-[#F7F8FF]">
            <Routes>
            <Route path="/admin-dashboard" element={<DashBoard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctors-list" element={<DoctorsList />} />
              <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<DoctorLayout />}>
          <Route path="/doctor-dashboard" element={<DoctorDashBoard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/doctor-dashboard" replace />} />
      </Routes>
    </>
  );
};
export default App;
