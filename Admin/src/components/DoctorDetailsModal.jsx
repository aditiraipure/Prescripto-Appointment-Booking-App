import { useEffect } from "react";
import { createPortal } from "react-dom";

const DoctorDetailsModal = ({ doctor, currency, loading, error, onClose }) => {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  const bookedSlots = doctor?.slots_booked
    ? Object.values(doctor.slots_booked).reduce((total, slots) => total + (Array.isArray(slots) ? slots.length : 0), 0)
    : 0;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-transparent backdrop-blur-[2px] p-4 flex items-center justify-center overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="doctor-details-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="bg-[#F7F8FF] w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-indigo-100 flex flex-col overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4 shrink-0"><div><h2 id="doctor-details-title" className="text-xl font-semibold text-gray-900">Doctor Details</h2><p className="text-sm text-gray-500 mt-1">Complete database profile information</p></div><button type="button" onClick={onClose} aria-label="Close doctor details" className="w-10 h-10 rounded-full grid place-items-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="2" d="m6 6 12 12M18 6 6 18" /></svg></button></div>
        <div className="overflow-y-auto p-5 sm:p-6">
          {loading ? <div className="space-y-4">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div> : error ? <div className="py-12 text-center"><p className="font-medium text-red-500">Unable to load doctor details</p><p className="text-sm text-gray-400 mt-2">{error}</p></div> : !doctor ? <div className="py-12 text-center"><p className="font-medium text-gray-600">No doctor information available</p></div> : <>
            <div className="rounded-2xl bg-[#F2F3FF] p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {doctor.image ? <img src={doctor.image} alt={doctor.name || "Doctor"} className="w-28 h-28 rounded-2xl object-cover bg-white border-4 border-white shadow-sm" /> : <div className="w-28 h-28 rounded-2xl bg-white text-[#5f6FFF] grid place-items-center text-3xl font-semibold">D</div>}
              <div className="text-center sm:text-left"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${doctor.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{doctor.available ? "Available" : "Unavailable"}</span><h3 className="text-2xl font-semibold text-gray-900 mt-3">{doctor.name || "Unnamed doctor"}</h3><p className="text-gray-600 mt-1">{doctor.speciality || "Speciality unavailable"}</p><p className="text-sm text-gray-500 mt-1">{doctor.degree || "Education unavailable"}</p></div>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Email", doctor.email], ["Specialization", doctor.speciality], ["Experience", doctor.experience], ["Education", doctor.degree], ["Consultation Fees", doctor.fees != null ? `${currency}${doctor.fees}` : null], ["Availability", doctor.available ? "Available" : "Unavailable"], ["Address Line 1", doctor.address?.line1], ["Address Line 2", doctor.address?.line2], ["Booked Slots", bookedSlots], ["Profile Created", doctor.date ? new Date(doctor.date).toLocaleDateString() : null], ["Doctor ID", doctor._id]
              ].map(([label, value]) => <div key={label} className="rounded-xl border border-gray-200 p-4 min-w-0"><p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p><p className="text-sm font-medium text-gray-700 mt-2 break-words">{value ?? "Not available"}</p></div>)}
              <div className="sm:col-span-2 rounded-xl border border-gray-200 p-4"><p className="text-xs font-medium uppercase tracking-wide text-gray-400">About</p><p className="text-sm text-gray-600 leading-relaxed mt-2 whitespace-pre-wrap">{doctor.about || "Not available"}</p></div>
            </div>
          </>}
        </div>
        <div className="px-5 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end shrink-0"><button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">Close</button></div>
      </div>
    </div>,
    document.body
  );
};

export default DoctorDetailsModal;
