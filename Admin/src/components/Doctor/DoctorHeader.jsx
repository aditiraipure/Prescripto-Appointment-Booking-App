import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets_admin/assets";
import { DoctorContext } from "../../context/DoctorContext";

const titles = {
  "/doctor-dashboard": "Doctor Dashboard",
  "/doctor-appointments": "Appointments",
  "/doctor-profile": "My Profile",
};

const DoctorHeader = () => {
  const { dToken, setDToken, doctorData } = useContext(DoctorContext);
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = doctorData;
  const title = titles[location.pathname] || "Doctor Portal";

  const logout = () => {
    if (!dToken) return;
    localStorage.removeItem("dToken");
    setDToken("");
    toast.success("Logout successful");
    navigate("/", { replace: true });
  };

  return (
    <header className="h-20 shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-sm z-30">
      <div className="flex items-center gap-4 min-w-0">
        <img src={assets.admin_logo} alt="Prescripto Doctor Portal" className="w-32 sm:w-40" />
        <div className="hidden sm:block h-8 w-px bg-gray-200" />
        <div className="min-w-0"><p className="text-xs text-gray-400">Doctor Portal / {title}</p><h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{title}</h1></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button type="button" aria-label="Notifications" className="relative w-10 h-10 rounded-full border border-gray-200 grid place-items-center text-gray-500 hover:bg-[#F2F3FF] hover:text-[#5f6FFF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0h6Z" /></svg></button>
        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
          {doctor?.image ? <img src={doctor.image} alt={doctor.name || "Doctor"} className="w-10 h-10 rounded-full object-cover bg-gray-100" /> : <div className="w-10 h-10 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">D</div>}
          <div className="leading-tight"><p className="text-sm font-semibold text-gray-800 max-w-40 truncate">{doctor?.name || "Doctor"}</p><p className="text-xs text-gray-400">{doctor?.speciality || "Medical professional"}</p></div>
        </div>
        <button onClick={logout} className="bg-[#5f6FFF] hover:bg-[#4e5bff] active:scale-[0.98] rounded-lg text-white px-4 sm:px-5 py-2.5 text-sm font-medium transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF] focus-visible:ring-offset-2">Logout</button>
      </div>
    </header>
  );
};

export default DoctorHeader;
