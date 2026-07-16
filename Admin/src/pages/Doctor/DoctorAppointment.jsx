import { useContext, useMemo, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointment = () => {
  const { appointments, appointmentsLoading } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = useMemo(() => appointments.filter((item) => {
    const currentStatus = item.cancelled ? "cancelled" : item.payment ? "paid" : "booked";
    const searchable = `${item.userData?.name || ""} ${item.userData?.email || ""}`.toLowerCase();
    return (status === "all" || status === currentStatus) && searchable.includes(search.trim().toLowerCase());
  }), [appointments, search, status]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto animate-dashboard-fade">
      <div className="mb-6"><p className="text-sm text-gray-500">Doctor Portal / Appointments</p><h2 className="text-2xl font-semibold text-gray-900 mt-1">My Appointments</h2><p className="text-sm text-gray-500 mt-2">View your current and previous patient bookings.</p></div>
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"><div className="relative w-full lg:max-w-md"><svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} type="search" placeholder="Search patient name or email..." aria-label="Search appointments" className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#5f6FFF] focus:ring-2 focus:ring-indigo-100 transition" /></div><div className="flex items-center gap-3"><label htmlFor="doctor-status" className="text-sm text-gray-500">Status</label><select id="doctor-status" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="px-3 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-700 outline-none focus:border-[#5f6FFF]"><option value="all">All statuses</option><option value="booked">Booked</option><option value="paid">Paid</option><option value="cancelled">Cancelled</option></select></div></div>
        <div className="overflow-x-auto min-h-[420px]"><table className="w-full min-w-[900px] text-sm"><thead className="bg-gray-50 text-gray-500 sticky top-0"><tr>{["#", "Patient", "Age", "Date & Time", "Payment", "Fees", "Status"].map((heading) => <th key={heading} className="text-left font-medium px-5 py-3.5">{heading}</th>)}</tr></thead><tbody className="divide-y divide-gray-100">
          {appointmentsLoading && Array.from({ length: 6 }).map((_, row) => <tr key={row}>{Array.from({ length: 7 }).map((__, cell) => <td key={cell} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)}
          {!appointmentsLoading && visible.map((item, index) => <tr key={item._id || index} className="hover:bg-gray-50 transition-colors"><td className="px-5 py-4 text-gray-400">{(safePage - 1) * rowsPerPage + index + 1}</td><td className="px-5 py-4"><div className="flex items-center gap-3">{item.userData?.image ? <img loading="lazy" src={item.userData.image} alt={item.userData?.name || "Patient"} className="w-10 h-10 rounded-full object-cover bg-gray-100" /> : <span className="w-10 h-10 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">P</span>}<div><p className="font-medium text-gray-800">{item.userData?.name || "Unknown patient"}</p><p className="text-xs text-gray-400">{item.userData?.email || "No email"}</p></div></div></td><td className="px-5 py-4 text-gray-600">{item.userData?.dob ? calculateAge(item.userData.dob) : "—"}</td><td className="px-5 py-4"><p className="text-gray-700">{item.slotDate ? slotDateFormat(item.slotDate) : "Not available"}</p><p className="text-xs text-gray-400 mt-1">{item.slotTime || "Time unavailable"}</p></td><td className="px-5 py-4 text-gray-600">{item.payment ? "Online" : "Pending"}</td><td className="px-5 py-4 font-medium text-gray-700">{currency}{item.amount ?? 0}</td><td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.cancelled ? "bg-red-50 text-red-500" : item.payment ? "bg-green-50 text-green-600" : "bg-[#F2F3FF] text-[#5f6FFF]"}`}>{item.cancelled ? "Cancelled" : item.payment ? "Paid" : "Booked"}</span></td></tr>)}
        </tbody></table>{!appointmentsLoading && visible.length === 0 && <div className="py-16 text-center"><p className="font-medium text-gray-600">No appointments found</p><p className="text-sm text-gray-400 mt-1">Appointments matching your filters will appear here.</p></div>}</div>
        <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3"><p className="text-sm text-gray-500">Showing {filtered.length ? (safePage - 1) * rowsPerPage + 1 : 0}–{Math.min(safePage * rowsPerPage, filtered.length)} of {filtered.length}</p><div className="flex items-center gap-1.5"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={safePage === 1} className="pagination-button">Previous</button><span className="px-3 text-sm text-gray-600">Page {safePage} of {totalPages}</span><button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={safePage === totalPages} className="pagination-button">Next</button></div></div>
      </section>
    </div>
  );
};

export default DoctorAppointment;
