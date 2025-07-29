import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
       console.log("📋 Appointments Fetched:", data.appointments);

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const razorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/online-payment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error("Payment initialization failed");
      console.log(error);
    }
  };

      const initPay = (order) => {
       const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razorpay`,
            response,
            { headers: { token } }
          );

          if (data.success) {
            toast.success("Payment successful");
            
            getUserAppointments();
            navigate('/my-appointments');
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-800 border-b'>My Appointments</p>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No Appointments Found</p>
      ) : (
        <div>
          {appointments.slice(0, 9).map((item, index) => (
            <div className='flex justify-between items-start gap-6 py-4 border-b' key={index}>
              <div className="flex gap-4">
                <img
                  className='w-32 h-32 object-cover bg-indigo-50 rounded'
                  src={item.docData?.image || 'https://via.placeholder.com/150'}
                  alt="image"
                />
                <div className='flex-1 text-sm text-gray-800'>
                  <p className='text-neutral-900 font-semibold'>{item.docData?.name}</p>
                  <p>{item.docData?.speciality}</p>
                  <p className='text-zinc-800 font-medium'>Address:</p>
                  <p className='text-xs'>{item.docData?.address?.line1}</p>
                  <p className='text-xs'>{item.docData?.address?.line2}</p>
                  <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-800 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                {!item.cancelled &&  item.payment && (
                  <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>
                    Paid
                  </button>
                )}

                {!item.cancelled && !item.payment ? (
                  <>
                    <button
                      onClick={() => razorpay(item._id)}
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                      Pay Online
                    </button>
                  </>
                ) : null}
                {!item.cancelled && (
              <button
              onClick={() => cancelAppointment(item._id)}
              className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
             Cancel Appointment</button>
             )}

              {item.cancelled && (
              <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500' disabled>
              Appointment Cancelled
              </button>
              )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;



