import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const createFormData = (doctor) => ({
  name: doctor?.name || "",
  email: doctor?.email || "",
  speciality: doctor?.speciality || "",
  experience: doctor?.experience || "",
  degree: doctor?.degree || "",
  fees: doctor?.fees ?? "",
  address: { line1: doctor?.address?.line1 || "", line2: doctor?.address?.line2 || "" },
  about: doctor?.about || "",
  available: Boolean(doctor?.available),
});

const DoctorProfile = () => {
  const { doctorData, profileLoading, profileError, getDoctorProfile, updateDoctorProfile } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(createFormData(doctorData));

  useEffect(() => setFormData(createFormData(doctorData)), [doctorData]);

  const updateField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));
  const updateAddress = (field, value) => setFormData((current) => ({ ...current, address: { ...current.address, [field]: value } }));

  const cancelEditing = () => {
    setFormData(createFormData(doctorData));
    setEditing(false);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    if (saving) return;
    const requiredValues = [formData.name, formData.email, formData.speciality, formData.experience, formData.degree, formData.about];
    if (requiredValues.some((value) => !String(value).trim())) {
      toast.error("Validation error: please complete all required fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Validation error: enter a valid email address");
      return;
    }
    if (formData.fees === "" || Number(formData.fees) < 0 || Number.isNaN(Number(formData.fees))) {
      toast.error("Validation error: enter valid consultation fees");
      return;
    }

    setSaving(true);
    const updated = await updateDoctorProfile(formData);
    if (updated) {
      await getDoctorProfile();
      setEditing(false);
    }
    setSaving(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1100px] mx-auto animate-dashboard-fade">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><p className="text-sm text-gray-500">Doctor Portal / My Profile</p><h2 className="text-2xl font-semibold text-gray-900 mt-1">My Profile</h2><p className="text-sm text-gray-500 mt-2">Review and maintain your professional information.</p></div>{doctorData && !editing && <button type="button" onClick={() => setEditing(true)} className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#5f6FFF] text-white text-sm font-medium hover:bg-[#4e5bff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF] focus-visible:ring-offset-2">Edit Profile</button>}</div>

      {profileLoading ? <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"><div className="h-44 bg-gray-100 rounded-xl animate-pulse" /></div> : profileError ? <section className="bg-white border border-gray-200 rounded-2xl shadow-sm py-16 px-6 text-center"><h3 className="font-semibold text-red-500">Unable to load profile</h3><p className="text-sm text-gray-400 mt-2">{profileError}</p><button onClick={getDoctorProfile} className="mt-5 px-5 py-2.5 rounded-xl bg-[#5f6FFF] text-white text-sm font-medium">Try Again</button></section> : doctorData ? (
        <form onSubmit={saveProfile} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#F2F3FF] px-6 py-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {doctorData.image ? <img src={doctorData.image} alt={doctorData.name || "Doctor"} className="w-32 h-32 rounded-2xl object-cover bg-white border-4 border-white shadow-sm" /> : <div className="w-32 h-32 rounded-2xl bg-white text-[#5f6FFF] grid place-items-center text-4xl font-semibold shadow-sm">D</div>}
            <div className="text-center sm:text-left flex-1"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${formData.available ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{formData.available ? "Available" : "Unavailable"}</span><h3 className="text-2xl font-semibold text-gray-900 mt-3">{doctorData.name}</h3><p className="text-gray-600 mt-1">{doctorData.degree} · {doctorData.speciality}</p><p className="text-xs text-gray-400 mt-3">Profile image and account ID are managed as read-only fields.</p></div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {editing ? <>
              <label className="form-field"><span>Doctor Name *</span><input className="admin-input" value={formData.name} onChange={(event) => updateField("name", event.target.value)} /></label>
              <label className="form-field"><span>Email Address *</span><input className="admin-input" type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} /></label>
              <label className="form-field"><span>Specialization *</span><input className="admin-input" value={formData.speciality} onChange={(event) => updateField("speciality", event.target.value)} /></label>
              <label className="form-field"><span>Education *</span><input className="admin-input" value={formData.degree} onChange={(event) => updateField("degree", event.target.value)} /></label>
              <label className="form-field"><span>Experience *</span><input className="admin-input" value={formData.experience} onChange={(event) => updateField("experience", event.target.value)} /></label>
              <label className="form-field"><span>Consultation Fees *</span><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span><input className="admin-input pl-9" type="number" min="0" value={formData.fees} onChange={(event) => updateField("fees", event.target.value)} /></div></label>
              <label className="form-field"><span>Address Line 1</span><input className="admin-input" value={formData.address.line1} onChange={(event) => updateAddress("line1", event.target.value)} /></label>
              <label className="form-field"><span>Address Line 2</span><input className="admin-input" value={formData.address.line2} onChange={(event) => updateAddress("line2", event.target.value)} /></label>
              <label className="form-field md:col-span-2"><span>About *</span><textarea className="admin-input min-h-32 resize-y" value={formData.about} onChange={(event) => updateField("about", event.target.value)} /></label>
              <label className="md:col-span-2 flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4"><div><p className="text-sm font-medium text-gray-700">Available for appointments</p><p className="text-xs text-gray-400 mt-1">Controls whether users can book new appointments.</p></div><input type="checkbox" checked={formData.available} onChange={(event) => updateField("available", event.target.checked)} className="w-5 h-5 accent-[#5f6FFF]" /></label>
            </> : <>
              {[["Name", doctorData.name], ["Email", doctorData.email], ["Specialization", doctorData.speciality], ["Education", doctorData.degree], ["Experience", doctorData.experience], ["Consultation Fees", doctorData.fees != null ? `${currency}${doctorData.fees}` : null], ["Address Line 1", doctorData.address?.line1], ["Address Line 2", doctorData.address?.line2], ["Doctor ID", doctorData._id], ["Created", doctorData.date ? new Date(doctorData.date).toLocaleDateString() : null]].map(([label, value]) => <div key={label} className="rounded-xl border border-gray-200 p-4"><p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p><p className="text-sm font-medium text-gray-700 mt-2 break-words">{value || "Not available"}</p></div>)}
              <div className="md:col-span-2 rounded-xl border border-gray-200 p-5"><p className="text-xs font-medium text-gray-400 uppercase tracking-wide">About</p><p className="text-sm text-gray-600 leading-relaxed mt-3 whitespace-pre-wrap">{doctorData.about || "No profile description is available."}</p></div>
            </>}
          </div>

          {editing && <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3"><button type="button" disabled={saving} onClick={cancelEditing} className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50">Cancel</button><button type="submit" disabled={saving} className="min-w-32 px-5 py-2.5 rounded-xl bg-[#5f6FFF] text-white text-sm font-medium hover:bg-[#4e5bff] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">{saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}{saving ? "Saving..." : "Save Changes"}</button></div>}
        </form>
      ) : <section className="bg-white border border-gray-200 rounded-2xl shadow-sm py-16 px-6 text-center"><h3 className="font-semibold text-gray-700">Profile data is not available</h3><p className="text-sm text-gray-400 mt-2">Please sign in again or retry loading your profile.</p><button onClick={getDoctorProfile} className="mt-5 px-5 py-2.5 rounded-xl bg-[#5f6FFF] text-white text-sm font-medium">Reload Profile</button></section>}
    </div>
  );
};

export default DoctorProfile;
