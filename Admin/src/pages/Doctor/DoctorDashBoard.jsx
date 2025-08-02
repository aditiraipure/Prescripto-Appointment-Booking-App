import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const cardColors = [
  "from-indigo-500 to-blue-400",
  "from-green-500 to-teal-400",
  "from-pink-500 to-red-400",
];

const DoctorDashBoard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  useEffect(() => {
    console.log("dashData:", dashData);
  }, [dashData]);

  return (
    dashData && (
      <div className="m-5">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-6 mb-10">
          {/* Earnings */}
          <div className="flex items-center gap-4 bg-gradient-to-br from-indigo-500 to-blue-400 shadow-lg p-5 min-w-60 rounded-xl border-2 border-transparent hover:scale-105 transition-all duration-200">
            <div className="bg-white rounded-full p-3 shadow">
              <img className="w-12" src={assets.earning_icon} alt="earning_icon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white drop-shadow">
                {currency} {dashData.earning}
              </p>
              <p className="text-indigo-100 font-medium">Earnings</p>
            </div>
          </div>
          {/* Appointments */}
          <div className="flex items-center gap-4 bg-gradient-to-br from-green-500 to-teal-400 shadow-lg p-5 min-w-60 rounded-xl border-2 border-transparent hover:scale-105 transition-all duration-200">
            <div className="bg-white rounded-full p-3 shadow">
              <img className="w-12" src={assets.appointments_icon} alt="appointment_icon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white drop-shadow">
                {dashData.appointments}
              </p>
              <p className="text-green-100 font-medium">Appointments</p>
            </div>
          </div>
          {/* Patients */}
          <div className="flex items-center gap-4 bg-gradient-to-br from-pink-500 to-red-400 shadow-lg p-5 min-w-60 rounded-xl border-2 border-transparent hover:scale-105 transition-all duration-200">
            <div className="bg-white rounded-full p-3 shadow">
              <img className="w-12" src={assets.patients_icon} alt="patients" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white drop-shadow">
                {dashData.patients}
              </p>
              <p className="text-pink-100 font-medium">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Booking */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-indigo-100 to-blue-50 border-b">
            <img src={assets.list_icon} alt="list_icon" className="w-6" />
            <p className="font-semibold text-lg text-indigo-700">Latest Booking</p>
          </div>

          <div className="divide-y">
            {Array.isArray(dashData.latestAppointments) &&
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-4 gap-4 hover:bg-indigo-50 transition"
                  key={index}
                >
                  <img
                    className="rounded-full w-12 h-12 object-cover border-2 border-indigo-200 shadow"
                    src={item.userData?.image}
                    alt="UserData.image"
                  />
                  <div className="flex-1 text-base">
                    <p className="text-gray-800 font-semibold">
                      {item.userData?.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-semibold shadow">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold shadow">
                      Completed
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className=" hover:bg-red-200 rounded-full p-2 transition"
                        title="Cancel"
                      >
                        <img
                          className="w-10"
                          src={assets.cancel_icon}
                          alt="cancel_icon"
                        />
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className=" hover:bg-green-200 rounded-full p-2 transition"
                        title="Complete"
                      >
                        <img
                          className="w-10"
                          src={assets.tick_icon}
                          alt="tick_icon"
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashBoard;
