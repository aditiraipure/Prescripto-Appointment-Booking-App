import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets_admin/assets";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const endpoint = state === "Admin" ? "admin" : "doctors";
      const { data } = await axios.post(`${backendUrl}/api/${endpoint}/login`, { email, password });

      if (data.success) {
        if (state === "Admin") {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful. Redirecting to dashboard...");
          navigate("/admin-dashboard", { replace: true });
        } else {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful. Redirecting to dashboard...");
          navigate("/doctor-dashboard", { replace: true });
        }
      } else {
        toast.error(data.message || `Invalid ${state.toLowerCase()} credentials`);
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network connection failed. Please try again.");
      } else if (error.response.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "Authentication failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchPortal = () => {
    setState((current) => current === "Admin" ? "Doctor" : "Admin");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <main className="login-page min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden">
      <section className="min-h-0 bg-[#5f6FFF] px-8 py-5 sm:px-12 lg:px-16 flex flex-col justify-between text-white">
        <img src={assets.admin_logo} alt="Prescripto Admin" className="w-44 brightness-0 invert" />
        <div className="max-w-xl py-4">
          <p className="text-sm font-medium tracking-widest uppercase text-indigo-100 mb-3">Healthcare management</p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">Prescripto Admin Portal</h1>
          <p className="text-indigo-100 mt-4 leading-relaxed max-w-md">Monitor your healthcare system efficiently from one secure workspace.</p>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {[
              [assets.doctor_icon, "Manage Doctors"],
              [assets.patients_icon, "Manage Patients"],
              [assets.appointments_icon, "Appointments"],
            ].map(([icon, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl p-3">
                <img src={icon} alt="" className="w-9 h-9 mb-3" />
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-indigo-100">Prescripto Administration</p>
      </section>

      <section className="min-h-0 px-5 py-4 sm:px-10 lg:px-16 flex items-center justify-center bg-gray-50">
        <form onSubmit={onSubmitHandler} className="login-card bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#5f6FFF] mb-2">SECURE PORTAL</p>
            <h2 className="text-3xl font-semibold text-gray-900">{state} Login</h2>
            <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access the {state.toLowerCase()} workspace.</p>
          </div>

          <div className="mb-5">
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <svg aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7.5 10.4 13a2.7 2.7 0 0 0 3.2 0L21 7.5M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" /></svg>
              <input id="admin-email" required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="login-input w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none placeholder:text-gray-400" />
            </div>
          </div>

          <div className="mb-7">
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <svg aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12a2 2 0 0 1 2 2v7H4v-7a2 2 0 0 1 2-2Z" /></svg>
              <input id="admin-password" required autoComplete="current-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="login-input w-full pl-12 pr-16 py-3 rounded-xl border border-gray-300 outline-none placeholder:text-gray-400" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#5f6FFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF] rounded" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full min-h-12 p-3 bg-[#5f6FFF] text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2">
            {isSubmitting && <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden="true" />}
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
            <button type="button" className="text-[#5f6FFF] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF] rounded" onClick={switchPortal}>Click Here</button>
          </p>
          <p className="text-center mt-8 pt-5 border-t border-gray-100 text-xs text-gray-400">Prescripto Admin Portal</p>
        </form>
      </section>
    </main>
  );
};

export default Login;
