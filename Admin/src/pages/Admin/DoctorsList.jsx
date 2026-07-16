import { useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import ActionMenu from "../../components/ActionMenu";
import DoctorDetailsModal from "../../components/DoctorDetailsModal";
import DeleteDoctorDialog from "../../components/DeleteDoctorDialog";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext);
  const { currency } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    if (aToken) Promise.resolve(getAllDoctors()).finally(() => setLoading(false));
  }, [aToken]);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim().toLowerCase()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredDoctors = useMemo(() => doctors.filter((doctor) => {
    const matchesAvailability = availability === "all" || String(Boolean(doctor.available)) === availability;
    const searchable = `${doctor.name || ""} ${doctor.email || ""} ${doctor.speciality || ""} ${doctor.degree || ""}`.toLowerCase();
    return matchesAvailability && searchable.includes(search);
  }), [doctors, search, availability]);

  useEffect(() => setPage(1), [search, availability]);
  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const visibleDoctors = filteredDoctors.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const confirmDelete = async () => {
    if (!doctorToDelete || deleting) return;
    setDeleting(true);
    const deleted = await deleteDoctor(doctorToDelete._id);
    setDeleting(false);
    if (deleted) setDoctorToDelete(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto animate-dashboard-fade">
      <div className="mb-6"><p className="text-sm text-gray-500">Admin Portal / Doctors</p><h2 className="text-2xl font-semibold text-gray-900 mt-1">Doctors Directory</h2><p className="text-sm text-gray-500 mt-2">View doctor details and manage their availability.</p></div>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:max-w-md"><svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} type="search" placeholder="Search name, email or speciality..." aria-label="Search doctors" className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#5f6FFF] focus:ring-2 focus:ring-indigo-100 transition" /></div>
          <div className="flex flex-wrap items-center gap-3"><label htmlFor="availability-filter" className="text-sm text-gray-500">Availability</label><select id="availability-filter" value={availability} onChange={(event) => setAvailability(event.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-700 outline-none focus:border-[#5f6FFF]"><option value="all">All doctors</option><option value="true">Available</option><option value="false">Unavailable</option></select><span className="text-xs font-medium text-[#5f6FFF] bg-[#F2F3FF] px-3 py-2 rounded-lg">{filteredDoctors.length} doctors</span></div>
        </div>

        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full min-w-[1050px] text-sm">
            <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10"><tr>{["#", "Doctor", "Speciality", "Education", "Experience", "Fees", "Address", "Status", "Action"].map((heading) => <th key={heading} className={`${heading === "Action" ? "text-center" : "text-left"} font-medium px-5 py-3.5`}>{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {loading && Array.from({ length: 6 }).map((_, row) => <tr key={row}>{Array.from({ length: 9 }).map((__, cell) => <td key={cell} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)}
              {!loading && visibleDoctors.map((doctor, index) => (
                <tr key={doctor._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-gray-400">{(safePage - 1) * rowsPerPage + index + 1}</td>
                  <td className="px-5 py-4"><div className="flex items-center gap-3">{doctor.image ? <img loading="lazy" src={doctor.image} alt={doctor.name || "Doctor"} className="w-11 h-11 object-cover rounded-full bg-gray-100" /> : <span className="w-11 h-11 rounded-full bg-[#F2F3FF] text-[#5f6FFF] grid place-items-center font-semibold">D</span>}<div><p className="font-medium text-gray-800 max-w-48 truncate">{doctor.name || "Unnamed doctor"}</p><p className="text-xs text-gray-400 max-w-48 truncate">{doctor.email || "No email"}</p></div></div></td>
                  <td className="px-5 py-4 text-gray-600">{doctor.speciality || "Not available"}</td><td className="px-5 py-4 text-gray-600">{doctor.degree || "Not available"}</td><td className="px-5 py-4 text-gray-600">{doctor.experience || "Not available"}</td><td className="px-5 py-4 font-medium text-gray-700">{currency}{doctor.fees ?? 0}</td>
                  <td className="px-5 py-4 text-gray-600 max-w-56"><p className="truncate">{doctor.address?.line1 || "Not available"}</p><p className="truncate text-xs text-gray-400 mt-1">{doctor.address?.line2 || ""}</p></td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${doctor.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{doctor.available ? "Available" : "Unavailable"}</span></td>
                  <td className="px-5 py-4 text-center"><ActionMenu label={`Actions for ${doctor.name || "doctor"}`} actions={[{ label: "View Details", icon: "view", onClick: () => setSelectedDoctor(doctor) }, { label: doctor.available ? "Mark unavailable" : "Mark available", icon: doctor.available ? assets.cancel_icon : assets.tick_icon, danger: doctor.available, onClick: () => changeAvailability(doctor._id) }, { label: "Delete Doctor", icon: "delete", danger: true, onClick: () => setDoctorToDelete(doctor) }]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && visibleDoctors.length === 0 && <div className="py-16 text-center"><p className="font-medium text-gray-600">No doctors found</p><p className="text-sm text-gray-400 mt-1">Try changing your search or availability filter.</p></div>}
        </div>

        <div className="px-4 sm:px-5 py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-sm text-gray-500">Showing {filteredDoctors.length ? (safePage - 1) * rowsPerPage + 1 : 0}–{Math.min(safePage * rowsPerPage, filteredDoctors.length)} of {filteredDoctors.length}</p><div className="flex items-center gap-1.5"><button onClick={() => setPage(1)} disabled={safePage === 1} className="pagination-button">First</button><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={safePage === 1} className="pagination-button">Previous</button><span className="px-3 text-sm text-gray-600">Page {safePage} of {totalPages}</span><button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={safePage === totalPages} className="pagination-button">Next</button><button onClick={() => setPage(totalPages)} disabled={safePage === totalPages} className="pagination-button">Last</button></div></div>
      </section>
      {selectedDoctor && <DoctorDetailsModal doctor={selectedDoctor} currency={currency} loading={false} error="" onClose={() => setSelectedDoctor(null)} />}
      {doctorToDelete && <DeleteDoctorDialog doctor={doctorToDelete} deleting={deleting} onCancel={() => !deleting && setDoctorToDelete(null)} onConfirm={confirmDelete} />}
    </div>
  );
};

export default DoctorsList;
