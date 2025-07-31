
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

const App = () => {

  const {aToken} =useContext(AdminContext)

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <div className="flex items-start">
        <SideBar></SideBar>
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<DashBoard />}></Route>
          <Route path="/all-appointments" element={<AllAppointments />}></Route>
          <Route path="/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/doctor-list" element={<DoctorsList />}></Route>
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