import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axios";


const AddDoctor = () => {
  const [docImage, setDocImage] = useState(null);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("cardiology");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    try {
      if (!docImage) {
        return toast.error("Image not selected");
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("image", docImage);
      formData.append("name", Name.trim());
      formData.append("email", email.trim());
      formData.append("password", password.trim());
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about.trim());
      formData.append("speciality", speciality.trim());
      formData.append("degree", degree.trim());
      formData.append(
        "address",
        JSON.stringify({ line1: address1.trim(), line2: address2.trim() })
      );

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            atoken: aToken,
          },
        }
      );

      if (data.success) {
        toast.success("Doctor added successfully");
        // Reset form fields
        setDocImage(null);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setSpeciality("cardiology");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error("Failed to add doctor");
        console.log("Server response (failure):", data);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto animate-dashboard-fade">
      <div className="mb-6"><p className="text-sm text-gray-500">Admin Portal / Doctors / Add Doctor</p><h2 className="text-2xl font-semibold text-gray-900 mt-1">Add New Doctor</h2><p className="text-sm text-gray-500 mt-2">Create a doctor profile and add their professional details.</p></div>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <label htmlFor="doc-img" className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-indigo-200 bg-[#F2F3FF] cursor-pointer overflow-hidden grid place-items-center hover:border-[#5f6FFF] transition-colors focus-within:ring-2 focus-within:ring-[#5f6FFF]">
              <img className={`w-full h-full ${docImage ? "object-cover" : "object-contain p-4"}`} src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="Doctor preview" />
              <input onChange={(event) => setDocImage(event.target.files[0])} accept="image/*" type="file" id="doc-img" className="sr-only" />
            </label>
            <div><h3 className="font-semibold text-gray-800">Doctor Profile Image</h3><p className="text-sm text-gray-500 mt-1">Upload a clear, professional image of the doctor.</p><label htmlFor="doc-img" className="inline-flex mt-3 text-sm font-medium text-[#5f6FFF] cursor-pointer hover:underline">Choose image</label></div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-gray-200"><h3 className="font-semibold text-gray-900">Personal & Professional Information</h3><p className="text-xs text-gray-500 mt-1">Enter the doctor's account and qualification details.</p></div>
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-gray-700">
            <label className="form-field"><span>Doctor Name</span><input value={Name} onChange={(event) => setName(event.target.value)} className="admin-input" type="text" placeholder="Enter doctor name" required /></label>
            <label className="form-field"><span>Email Address</span><input value={email} onChange={(event) => setEmail(event.target.value)} className="admin-input" type="email" placeholder="doctor@example.com" required autoComplete="email" /></label>
            <label className="form-field"><span>Password</span><input value={password} onChange={(event) => setPassword(event.target.value)} className="admin-input" type="password" placeholder="Enter account password" required autoComplete="new-password" /></label>
            <label className="form-field"><span>Experience</span><select value={experience} onChange={(event) => setExperience(event.target.value)} className="admin-input" name="experience"><option value="1 year">1 year</option><option value="2 year">2 year</option><option value="3 year">3 year</option><option value="4 year">4 year</option><option value="5 year">5 year</option><option value="6 year">6 year</option></select></label>
            <label className="form-field"><span>Speciality</span><select value={speciality} onChange={(event) => setSpeciality(event.target.value)} className="admin-input" name="speciality"><option value="General physician">General physician</option><option value="Gynecologist">Gynecologist</option><option value="Dermatologist">Dermatologist</option><option value="Pediatricians">Pediatricians</option><option value="Neurologist">Neurologist</option></select></label>
            <label className="form-field"><span>Education</span><input value={degree} onChange={(event) => setDegree(event.target.value)} className="admin-input" type="text" placeholder="e.g. MBBS, MD" /></label>
            <label className="form-field md:col-span-2"><span>Consultation Fees</span><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span><input value={fees} onChange={(event) => setFees(event.target.value)} className="admin-input pl-9" type="number" min="0" placeholder="Enter consultation fees" /></div></label>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-gray-200"><h3 className="font-semibold text-gray-900">Location & Biography</h3><p className="text-xs text-gray-500 mt-1">Add clinic address and information patients should know.</p></div>
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="form-field"><span>Address Line 1</span><input value={address1} onChange={(event) => setAddress1(event.target.value)} className="admin-input" type="text" placeholder="Street and building" /></label>
            <label className="form-field"><span>Address Line 2</span><input value={address2} onChange={(event) => setAddress2(event.target.value)} className="admin-input" type="text" placeholder="City and postal code" /></label>
            <label className="form-field md:col-span-2"><span>About Doctor</span><textarea value={about} onChange={(event) => setAbout(event.target.value)} className="admin-input min-h-32 resize-y" placeholder="Write about the doctor's background, expertise and approach" rows={5} /></label>
          </div>
        </section>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><p className="text-sm text-gray-500">Review the information before creating the profile.</p><button disabled={isSubmitting} className="min-w-36 bg-[#5f6FFF] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4e5bff] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2" type="submit">{isSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}{isSubmitting ? "Adding Doctor..." : "Add Doctor"}</button></div>
      </form>
    </div>
  );
};

export default AddDoctor;
