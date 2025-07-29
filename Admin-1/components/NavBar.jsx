import { assets } from "../assets/assets_admin/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  console.log("NavBar rendered");

  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };
  return (
    <nav className=" px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 space-x-4">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-40 sm:w-48 shadow cursor-pointer"
        />
        <p className=" border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-sm font-semibold">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-[#5f6FFF] hover:bg-[#4e5bff] rounded-full text-white  px-6 py-1 transition duration-200 shadow cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};
export default NavBar;
