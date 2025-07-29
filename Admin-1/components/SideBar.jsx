import React from "react";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className=" bg-white shadow-lg h-screen ">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="Home" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `  flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `  flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to="/doctors-list"
            className={({ isActive }) =>
              `  flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="People" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `  flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="Home" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/doctor-appointment"
            className={({ isActive }) =>
              `  flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `  flex items-center gap-3 p-3 px-2 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] " : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="People" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};
export default SideBar;
