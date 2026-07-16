import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import ActionMenu from "../../components/ActionMenu";

const DashBoard = () => {
  const { aToken, getDashData, cancelAppointment, deleteAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (aToken) {
      Promise.resolve(getDashData()).finally(() => setLoading(false));
    }
  }, [aToken]);

  const stats = [
    { label: "Doctors", value: dashData?.doctors ?? 0, icon: assets.doctor_icon },
    { label: "Appointments", value: dashData?.appointments ?? 0, icon: assets.appointments_icon },
    { label: "Patients", value: dashData?.patients ?? 0, icon: assets.patients_icon },
  ];
  const latestAppointments = Array.isArray(dashData?.latestAppointments) ? dashData.latestAppointments : [];
  const rowsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(latestAppointments.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const visibleAppointments = latestAppointments.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto animate-dashboard-fade">
      <div className="mb-7">
        <p className="text-sm text-gray-500">Overview</p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-1">Welcome back, Administrator</h2>
        <p className="text-sm text-gray-500 mt-2">Here is what is happening with Prescripto today.</p>
      </div>

      <section aria-label="Dashboard statistics" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="group min-h-32 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <p className="text-sm font-medium text-gray-500">Total {stat.label}</p>
              {loading ? <div className="h-9 w-20 mt-3 rounded bg-gray-100 animate-pulse" /> : <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>}
              <p className="text-xs text-gray-400 mt-2">Across the platform</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#F2F3FF] grid place-items-center group-hover:scale-105 transition-transform">
              <img className="w-11 h-11 object-contain" src={stat.icon} alt="" />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-7 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-5 flex items-center justify-between gap-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2F3FF] grid place-items-center"><img src={assets.list_icon} alt="" className="w-5" /></div>
            <div>
              <h3 className="font-semibold text-gray-900">Latest Bookings</h3>
              <p className="text-xs text-gray-500 mt-0.5">Most recent patient appointments</p>
            </div>
          </div>
          <span className="text-xs font-medium text-[#5f6FFF] bg-[#F2F3FF] px-3 py-1.5 rounded-full">{latestAppointments.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-gray-50 text-gray-500 sticky top-0">
              <tr>
                <th className="text-left font-medium px-6 py-3.5">Doctor</th>
                <th className="text-left font-medium px-6 py-3.5">Patient</th>
                <th className="text-left font-medium px-6 py-3.5">Appointment Date</th>
                <th className="text-left font-medium px-6 py-3.5">Time</th>
                <th className="text-left font-medium px-6 py-3.5">Status</th>
                <th className="text-center font-medium px-6 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && Array.from({ length: 3 }).map((_, index) => (
                <tr key={index}>{Array.from({ length: 6 }).map((__, cell) => <td key={cell} className="px-6 py-4"><div className="h-5 rounded bg-gray-100 animate-pulse" /></td>)}</tr>
              ))}
              {!loading && visibleAppointments.map((item, index) => {
                const status = item.cancelled ? "Cancelled" : item.payment ? "Completed" : "Confirmed";
                return (
                  <tr key={item._id || item.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.docData?.image ? <img loading="lazy" className="w-10 h-10 rounded-full object-cover bg-gray-100" src={item.docData.image} alt={item.docData?.name || "Doctor"} /> : <span className="w-10 h-10 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">D</span>}
                        <div><p className="font-medium text-gray-800 max-w-48 truncate">{item.docData?.name || "Unknown doctor"}</p><p className="text-xs text-gray-400">{item.docData?.speciality || "Not available"}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.userData?.name || "Unknown patient"}</td>
                    <td className="px-6 py-4 text-gray-600">{item.slotDate ? slotDateFormat(item.slotDate) : "Not available"}</td>
                    <td className="px-6 py-4 text-gray-600">{item.slotTime || "Not available"}</td>
                    <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.cancelled ? "bg-red-50 text-red-500" : item.payment ? "bg-green-50 text-green-600" : "bg-[#F2F3FF] text-[#5f6FFF]"}`}>{status}</span></td>
                    <td className="px-6 py-4 text-center">
                      <ActionMenu label={`Actions for ${item.docData?.name || "appointment"}`} actions={[{ label: item.cancelled ? "Already cancelled" : "Cancel appointment", icon: assets.cancel_icon, danger: true, disabled: item.cancelled, onClick: () => window.confirm("Do you really want to cancel this appointment?") && cancelAppointment(item._id || item.id) }, { label: "Delete appointment", icon: "delete", danger: true, onClick: () => window.confirm("Do you really want to permanently delete this appointment?") && deleteAppointment(item._id || item.id) }]} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!loading && latestAppointments.length === 0 && <div className="py-14 text-center"><p className="font-medium text-gray-600">No recent bookings</p><p className="text-sm text-gray-400 mt-1">New appointments will appear here.</p></div>}
        </div>
        {!loading && latestAppointments.length > 0 && <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3"><p className="text-sm text-gray-500">Showing {(safePage - 1) * rowsPerPage + 1}–{Math.min(safePage * rowsPerPage, latestAppointments.length)} of {latestAppointments.length}</p><div className="flex items-center gap-1.5"><button onClick={() => setPage(1)} disabled={safePage === 1} className="pagination-button">First</button><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={safePage === 1} className="pagination-button">Previous</button><span className="px-3 text-sm text-gray-600">Page {safePage} of {totalPages}</span><button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={safePage === totalPages} className="pagination-button">Next</button><button onClick={() => setPage(totalPages)} disabled={safePage === totalPages} className="pagination-button">Last</button></div></div>}
      </section>
    </div>
  );
};

export default DashBoard;
