import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImage) {
        return toast.error("Image not selected");
      }

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
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                docImage ? URL.createObjectURL(docImage) : assets.upload_area
              }
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setDocImage(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload Doctor's Image</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter Doctor name"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border rounded px-3 py-2"
                name="experience"
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Fees</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Enter Fees"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border rounded px-3 py-2"
                name="speciality"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Education</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter Education"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p>Address</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="mt-4 mb-2">About</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about the doctor"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors cursor-pointer"
          type="submit"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
