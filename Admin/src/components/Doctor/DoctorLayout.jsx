import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import DoctorHeader from "./DoctorHeader";
import DoctorSidebar from "./DoctorSidebar";

const DoctorLayout = () => {
  const { dToken, getAppointments, getDoctorProfile } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
      getDoctorProfile();
    }
  }, [dToken]);

  return (
    <div className="h-screen overflow-hidden bg-[#F2F3FF] flex flex-col">
      <DoctorHeader />
      <div className="flex flex-1 min-h-0">
        <DoctorSidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-[#F7F8FF]"><Outlet /><footer className="px-6 pb-6 text-center text-xs text-gray-400">Prescripto Doctor Portal</footer></main>
      </div>
    </div>
  );
};

export default DoctorLayout;
