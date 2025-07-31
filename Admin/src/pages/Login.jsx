import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin Login Successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctors/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
          toast.success("Doctor Login successfull");
        } else {
          toast.error();
        }
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-10 rounded-2xl shadow-lg min-w-[340px] w-full max-w-[400px]"
      >
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-[#4f3c8d] m-0">
            <span className="text-indigo-400 font-bold">{state}</span> Login
          </p>
        </div>

        <div className="mb-5">
          <label className="font-semibold text-[#333]">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border border-gray-300 mt-1 text-base"
          />
        </div>

        <div className="mb-6">
          <label className="font-semibold text-[#333]">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border border-gray-300 mt-1 text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-[#5f6FFF] text-white font-semibold border-none rounded-lg text-lg cursor-pointer"
        >
          Login
        </button>

        {state === "Admin" ? (
          <p className="text-center mt-4 text-sm text-gray-600">
            Doctor Login?{" "}
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-center mt-2 text-sm text-gray-600">
            Admin Login?{" "}
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
