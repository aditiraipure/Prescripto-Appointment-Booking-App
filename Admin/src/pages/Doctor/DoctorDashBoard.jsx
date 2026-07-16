import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashBoard = () => {
  const { appointments, appointmentsLoading, doctorData } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  const completed = appointments.filter((item) => item.payment && !item.cancelled);
  const active = appointments.filter((item) => !item.cancelled);
  const patients = new Set(appointments.map((item) => item.userId).filter(Boolean)).size;
  const earnings = completed.reduce((total, item) => total + Number(item.amount || 0), 0);
  const doctor = doctorData;
  const stats = [
    { label: "Appointments", value: active.length, icon: assets.appointments_icon },
    { label: "Patients", value: patients, icon: assets.patients_icon },
    { label: "Earnings", value: `${currency}${earnings}`, icon: assets.earning_icon },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto animate-dashboard-fade">
      <div className="mb-7"><p className="text-sm text-gray-500">Doctor Portal / Dashboard</p><h2 className="text-2xl font-semibold text-gray-900 mt-1">Welcome{doctor?.name ? `, ${doctor.name}` : ""}</h2><p className="text-sm text-gray-500 mt-2">Review your appointments and patient activity.</p></div>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((stat) => <div key={stat.label} className="min-h-32 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><div><p className="text-sm font-medium text-gray-500">{stat.label}</p>{appointmentsLoading ? <div className="h-9 w-20 mt-3 rounded bg-gray-100 animate-pulse" /> : <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>}<p className="text-xs text-gray-400 mt-2">Your practice overview</p></div><div className="w-16 h-16 rounded-2xl bg-[#F2F3FF] grid place-items-center"><img src={stat.icon} alt="" className="w-11 h-11 object-contain" /></div></div>)}
      </section>

      <section className="mt-7 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-5 border-b border-gray-200"><h3 className="font-semibold text-gray-900">Recent Appointments</h3><p className="text-xs text-gray-500 mt-1">Your latest patient bookings</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="bg-gray-50 text-gray-500"><tr><th className="text-left font-medium px-6 py-3.5">Patient</th><th className="text-left font-medium px-6 py-3.5">Date</th><th className="text-left font-medium px-6 py-3.5">Time</th><th className="text-left font-medium px-6 py-3.5">Fees</th><th className="text-left font-medium px-6 py-3.5">Status</th></tr></thead><tbody className="divide-y divide-gray-100">
          {appointmentsLoading && Array.from({ length: 4 }).map((_, row) => <tr key={row}>{Array.from({ length: 5 }).map((__, cell) => <td key={cell} className="px-6 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)}
          {!appointmentsLoading && appointments.slice(0, 10).map((item, index) => <tr key={item._id || index} className="hover:bg-gray-50 transition-colors"><td className="px-6 py-4"><div className="flex items-center gap-3">{item.userData?.image ? <img loading="lazy" src={item.userData.image} alt={item.userData?.name || "Patient"} className="w-10 h-10 rounded-full object-cover bg-gray-100" /> : <span className="w-10 h-10 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">P</span>}<div><p className="font-medium text-gray-800">{item.userData?.name || "Unknown patient"}</p><p className="text-xs text-gray-400">{item.userData?.email || "No email"}</p></div></div></td><td className="px-6 py-4 text-gray-600">{item.slotDate ? slotDateFormat(item.slotDate) : "Not available"}</td><td className="px-6 py-4 text-gray-600">{item.slotTime || "Not available"}</td><td className="px-6 py-4 font-medium text-gray-700">{currency}{item.amount ?? 0}</td><td className="px-6 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.cancelled ? "bg-red-50 text-red-500" : item.payment ? "bg-green-50 text-green-600" : "bg-[#F2F3FF] text-[#5f6FFF]"}`}>{item.cancelled ? "Cancelled" : item.payment ? "Paid" : "Booked"}</span></td></tr>)}
        </tbody></table>{!appointmentsLoading && appointments.length === 0 && <div className="py-14 text-center"><p className="font-medium text-gray-600">No appointments yet</p><p className="text-sm text-gray-400 mt-1">New patient bookings will appear here.</p></div>}</div>
      </section>
    </div>
  );
};

export default DoctorDashBoard;
