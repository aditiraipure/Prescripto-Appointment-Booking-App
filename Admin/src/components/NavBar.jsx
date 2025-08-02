import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-40 sm:w-48 cursor-pointer transition-transform duration-200 hover:scale-105"
        />
        <span className="ml-2 px-3 py-1 rounded-full border border-gray-300 bg-gray-50 text-gray-700 text-sm font-semibold shadow-sm">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>
      <button
        onClick={logout}
        className="bg-[#5f6FFF] hover:bg-[#4e5bff] rounded-full text-white px-6 py-2 font-medium shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:ring-opacity-50"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
