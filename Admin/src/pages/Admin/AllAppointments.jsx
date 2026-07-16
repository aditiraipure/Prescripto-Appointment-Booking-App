import { useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import ActionMenu from "../../components/ActionMenu";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment, deleteAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    if (aToken) Promise.resolve(getAllAppointments()).finally(() => setLoading(false));
  }, [aToken]);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim().toLowerCase()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredAppointments = useMemo(() => appointments.filter((item) => {
    const itemStatus = item.cancelled ? "cancelled" : item.payment ? "completed" : "confirmed";
    const matchesStatus = status === "all" || status === itemStatus;
    const searchable = `${item.userData?.name || ""} ${item.userData?.email || ""} ${item.docData?.name || ""} ${item.docData?.speciality || ""}`.toLowerCase();
    return matchesStatus && searchable.includes(search);
  }), [appointments, search, status]);

  useEffect(() => setPage(1), [search, status]);
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const visibleAppointments = filteredAppointments.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto animate-dashboard-fade">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Admin Portal / Appointments</p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-1">All Appointments</h2>
        <p className="text-sm text-gray-500 mt-2">Review and manage patient bookings across all doctors.</p>
      </div>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg>
            <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} type="search" placeholder="Search patient, doctor or speciality..." aria-label="Search appointments" className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#5f6FFF] focus:ring-2 focus:ring-indigo-100 transition" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="appointment-status" className="text-sm text-gray-500">Status</label>
            <select id="appointment-status" value={status} onChange={(event) => setStatus(event.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-700 outline-none focus:border-[#5f6FFF]">
              <option value="all">All statuses</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
            </select>
            <span className="text-xs font-medium text-[#5f6FFF] bg-[#F2F3FF] px-3 py-2 rounded-lg">{filteredAppointments.length} records</span>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full min-w-[1050px] text-sm">
            <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10">
              <tr>{["#", "Patient", "Age", "Date & Time", "Doctor", "Fees", "Status", "Action"].map((heading) => <th key={heading} className={`${heading === "Action" ? "text-center" : "text-left"} font-medium px-5 py-3.5`}>{heading}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && Array.from({ length: 6 }).map((_, row) => <tr key={row}>{Array.from({ length: 8 }).map((__, cell) => <td key={cell} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)}
              {!loading && visibleAppointments.map((item, index) => {
                const appointmentStatus = item.cancelled ? "Cancelled" : item.payment ? "Completed" : "Confirmed";
                return (
                  <tr key={item._id || item.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400">{(safePage - 1) * rowsPerPage + index + 1}</td>
                    <td className="px-5 py-4"><div className="flex items-center gap-3">{item.userData?.image ? <img loading="lazy" className="w-10 h-10 rounded-full object-cover bg-gray-100" src={item.userData.image} alt={item.userData?.name || "Patient"} /> : <span className="w-10 h-10 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">P</span>}<div><p className="font-medium text-gray-800 max-w-44 truncate">{item.userData?.name || "Unknown patient"}</p><p className="text-xs text-gray-400 max-w-44 truncate">{item.userData?.email || "No email"}</p></div></div></td>
                    <td className="px-5 py-4 text-gray-600">{item.userData?.dob ? calculateAge(item.userData.dob) : "—"}</td>
                    <td className="px-5 py-4"><p className="text-gray-700">{item.slotDate ? slotDateFormat(item.slotDate) : "Not available"}</p><p className="text-xs text-gray-400 mt-1">{item.slotTime || "Time unavailable"}</p></td>
                    <td className="px-5 py-4"><div className="flex items-center gap-3">{item.docData?.image ? <img loading="lazy" className="w-10 h-10 rounded-full object-cover bg-gray-100" src={item.docData.image} alt={item.docData?.name || "Doctor"} /> : <span className="w-10 h-10 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">D</span>}<div><p className="font-medium text-gray-800 max-w-44 truncate">{item.docData?.name || "Unknown doctor"}</p><p className="text-xs text-gray-400">{item.docData?.speciality || "No speciality"}</p></div></div></td>
                    <td className="px-5 py-4 font-medium text-gray-700">{currency}{item.amount ?? item.docData?.fees ?? 0}</td>
                    <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.cancelled ? "bg-red-50 text-red-500" : item.payment ? "bg-green-50 text-green-600" : "bg-[#F2F3FF] text-[#5f6FFF]"}`}>{appointmentStatus}</span></td>
                    <td className="px-5 py-4 text-center"><ActionMenu label={`Actions for ${item.userData?.name || "appointment"}`} actions={[{ label: item.cancelled ? "Already cancelled" : "Cancel appointment", icon: assets.cancel_icon, danger: true, disabled: item.cancelled, onClick: () => window.confirm("Do you really want to cancel this appointment?") && cancelAppointment(item._id || item.id) }, { label: "Delete appointment", icon: "delete", danger: true, onClick: () => window.confirm("Do you really want to permanently delete this appointment?") && deleteAppointment(item._id || item.id) }]} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!loading && visibleAppointments.length === 0 && <div className="py-16 text-center"><p className="font-medium text-gray-600">No appointments found</p><p className="text-sm text-gray-400 mt-1">Try changing your search or status filter.</p></div>}
        </div>

        <div className="px-4 sm:px-5 py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">Showing {filteredAppointments.length ? (safePage - 1) * rowsPerPage + 1 : 0}–{Math.min(safePage * rowsPerPage, filteredAppointments.length)} of {filteredAppointments.length}</p>
          <div className="flex items-center gap-1.5"><button onClick={() => setPage(1)} disabled={safePage === 1} className="pagination-button">First</button><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={safePage === 1} className="pagination-button">Previous</button><span className="px-3 text-sm text-gray-600">Page {safePage} of {totalPages}</span><button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={safePage === totalPages} className="pagination-button">Next</button><button onClick={() => setPage(totalPages)} disabled={safePage === totalPages} className="pagination-button">Last</button></div>
        </div>
      </section>
    </div>
  );
};

export default AllAppointments;
