import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";

const adminLinks = [
  { to: "/admin-dashboard", label: "Dashboard", icon: assets.home_icon },
  { to: "/all-appointments", label: "Appointments", icon: assets.appointment_icon },
  { to: "/add-doctor", label: "Add Doctor", icon: assets.add_icon },
  { to: "/doctors-list", label: "Doctors List", icon: assets.people_icon },
];

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const links = aToken ? adminLinks : [];

  return (
    <aside className="w-[76px] md:w-64 shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="px-3 md:px-5 pt-6 pb-3">
        <p className="hidden md:block text-xs font-semibold tracking-wider text-gray-400 uppercase">Main Menu</p>
      </div>
      <nav className="px-2 md:px-3 space-y-1.5" aria-label="Dashboard navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} title={link.label} className={({ isActive }) => `h-12 flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 rounded-xl text-sm font-medium transition-all border ${isActive ? "bg-[#F2F3FF] text-[#5f6FFF] border-indigo-100 shadow-sm" : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900"}`}>
            <img src={link.icon} alt="" className="w-5 h-5 shrink-0" />
            <span className="hidden md:block">{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="hidden md:block mx-5 mt-8 p-4 rounded-xl bg-[#F2F3FF] border border-indigo-100">
        <p className="text-sm font-semibold text-gray-700">Prescripto Admin</p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">Healthcare management made simple.</p>
      </div>
    </aside>
  );
};

export default SideBar;
