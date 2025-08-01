
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DashBoard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-2 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:border-[#5f6FFF]  hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="doctor_icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:border-[#5f6FFF]  hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon}
              alt="appointment_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:border-[#5f6FFF] hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.patients_icon}
              alt="patients_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200">
            <img src={assets.list_icon} alt="list_icon" />
            <p className="font-semibold">Latest Booking</p>
          </div>

          <div className="pt-4 border border-t-0">
            {Array.isArray(dashData.latestAppointments) &&
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item.docData?.image}
                    alt="docData.image"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.docData?.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Canclled</p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item.id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="cancel_icon"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};
export default DashBoard;
