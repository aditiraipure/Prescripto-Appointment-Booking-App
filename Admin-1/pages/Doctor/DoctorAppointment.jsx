import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div>
      <p>All Appointments</p>
      <div>
        <div>
          <P>#</P>
          <P>Patient</P>
          <P>Payment</P>
          <P>Age</P>
          <P>Date</P>
          <P>Fees</P>
          <P>Action</P>
        </div>
      </div>
    </div>
  );
};
export default DoctorAppointment;
