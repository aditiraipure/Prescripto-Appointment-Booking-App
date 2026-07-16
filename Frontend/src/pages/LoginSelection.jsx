import { Navigate, useNavigate } from "react-router-dom";
import { assets2 } from "../assets/assets_frontend/assets2";

const LoginSelection = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("aToken");
  const doctorToken = localStorage.getItem("dToken");

  if (adminToken) return <Navigate to="/admin/dashboard" replace />;
  if (doctorToken) return <Navigate to="/doctor/dashboard" replace />;
  if (userToken && userToken !== "false") return <Navigate to="/dashboard" replace />;

  const options = [
    { title: "Continue as User", description: "Book appointments and manage your healthcare.", path: "/login", icon: assets2.profile_pic },
    { title: "Continue as Admin", description: "Manage doctors, patients, and appointments.", path: "/admin/login", icon: assets2.verified_icon },
    { title: "Continue as Doctor", description: "View appointments and manage your profile.", path: "/doctor/login", icon: assets2.chats_icon },
  ];

  return (
    <main className="min-h-screen bg-[#F7F8FF] flex items-center justify-center p-5 sm:p-8">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-9"><img src={assets2.logo} alt="Prescripto" className="w-48 mx-auto" /><h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mt-7">Welcome to Prescripto</h1><p className="text-gray-500 mt-3 max-w-xl mx-auto">Choose how you would like to continue to your secure healthcare workspace.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {options.map((option) => <button key={option.path} type="button" onClick={() => navigate(option.path)} className="group text-left bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><span className="w-14 h-14 rounded-2xl bg-[#F2F3FF] grid place-items-center"><img src={option.icon} alt="" className="w-8 h-8 object-contain" /></span><h2 className="text-lg font-semibold text-gray-900 mt-5 group-hover:text-primary transition-colors">{option.title}</h2><p className="text-sm text-gray-500 leading-relaxed mt-2">{option.description}</p><span className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5">Continue <span aria-hidden="true">→</span></span></button>)}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">One platform for patients, doctors, and administrators.</p>
      </div>
    </main>
  );
};

export default LoginSelection;
