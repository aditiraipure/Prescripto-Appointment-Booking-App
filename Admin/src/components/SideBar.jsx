import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets_admin/assets";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 p-3 w-full cursor-pointer ${
    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
  }`;

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="bg-white shadow-lg h-svh w-64">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink to="/admin-dashboard" className={navLinkClass}>
            <img src={assets.home_icon} alt="Home" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to="/all-appointments" className={navLinkClass}>
            <img src={assets.appointment_icon} alt="Appointments" />
            <p>Appointments</p>
          </NavLink>
          <NavLink to="/add-doctor" className={navLinkClass}>
            <img src={assets.add_icon} alt="Add Doctor" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink to="/doctors-list" className={navLinkClass}>
            <img src={assets.people_icon} alt="People" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink to="/doctor-dashboard" className={navLinkClass}>
            <img src={assets.home_icon} alt="Home" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink to="/doctor-appointment" className={navLinkClass}>
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink to="/doctor-profile" className={navLinkClass}>
            <img src={assets.people_icon} alt="People" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};
export default SideBar;
