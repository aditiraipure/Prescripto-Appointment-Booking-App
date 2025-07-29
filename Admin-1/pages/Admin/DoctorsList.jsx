import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  // Fetch doctors when token is present
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-5 pt-5 gap-y-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border border-indigo-200 rounded-xl p-4 max-w-sm bg-white shadow-md"
          >
            <img
              src={doctor.image || "https://via.placeholder.com/150"}
              alt={doctor.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{doctor.name}</h2>
            <p className="text-sm text-gray-600">🩺 {doctor.speciality}</p>

            <div className="flex items-center mt-4 gap-2">
              <input
                onChange={() => changeAvailability(doctor._id)}
                type="checkbox"
                checked={doctor.available}
                className="cursor-pointer"
              />
              <label className="text-sm text-gray-700">Available</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
