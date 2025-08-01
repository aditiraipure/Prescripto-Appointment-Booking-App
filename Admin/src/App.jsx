
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllAppointments from "./pages/Admin/AllAppointments";
import DashBoard from "./pages/Admin/DashBoard";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashBoard from "./pages/Doctor/DoctorDashBoard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {

  const {aToken} =useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <div className="flex items-start">
        <SideBar></SideBar>
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<DashBoard />}></Route>
          <Route path="/all-appointments" element={<AllAppointments />}></Route>
          <Route path="/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/doctors-list" element={<DoctorsList />}></Route>

          {/* Doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashBoard />}></Route>
          <Route
            path="/doctor-appointment"
            element={<DoctorAppointment />}
          ></Route>
          <Route
            path="/doctor-profile"
            element={<DoctorProfile />}
          ></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login></Login>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App