import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets2 } from '/src/assets/assets_frontend/assets2';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const info = doctors.find(doc => doc._id === docId);
    if (info) {
      setDocInfo(info);
    } else {
      console.warn("Doctor not found for ID:", docId);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0); // 9 PM

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10, 0, 0);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0);
      }

      let timeSlots = [];

      while (currentDate <= endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

       let day = currentDate.getDate();
      const month =currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const slotDate = day + "_" + month +"_" + year;
      const slotTime = formattedTime
      const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

      if(isSlotAvailable){
      timeSlots.push({
      datetime: new Date(currentDate),
      Time: formattedTime
      });
    }
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    }
     setDocSlots(prev => [...prev, timeSlots]);
    }
  };

    const bookAppointment = async () => {
    if (!token || token === 'false') {
    toast.warn('Please login to book an appointment');
    setTimeout(() => navigate('/login'), 800);
    return;
    }

    try {
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
        toast.error("No slots available for this day");
        return;
      }
      if (!slotTime) {
        toast.error("Please select a time slot");
        return;
      }

      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = day + "_" + month +"_" + year;
      const { data } = await axios.post(
  "http://localhost:4000/api/user/book-appointment",
  {
    docId,
    slotDate,
    slotTime,
  },
  {
    headers: {
      token: localStorage.getItem("token"),
    },
  }
);

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
    
      toast.error(error.message);
    }
  };

 useEffect(() => {
  if (doctors.length && docId) {
    fetchDocInfo();
  }
}, [doctors, docId]);


  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Doctor Info */}
        <div className='flex flex-col sm:flex-row items-center gap-4 my-10'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 bg-white sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}
              <img className='w-5' src={assets2.verified_icon} alt="" />
            </p>
            <div className='flex items-center gap-2 text-gray-600 mt-2 sm:mt-1'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-gray-900 font-medium text-sm mt-3 sm:mt-1'>
                About <img src={assets2.info_icon} alt="" />
              </p>
              <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{docInfo.about}</p>
            </div>
            <p className='text-gray-600 font-medium text-sm mt-3 sm:mt-1'>
              Appointment Fees: <span className='text-black font-medium'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Slots */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-900'>
          <p>Booking Slots</p>
          <div className='flex items-center gap-4 mt-4 w-full'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime('');
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-800'}`}
                  key={index}
                >
                  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className='flex items-center gap-3 mt-7 overflow-x-scroll'>
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.Time)}
                  key={index}
                  className={`py-2 flex-shrink-0 px-5 cursor-pointer rounded-full text-sm font-light ${slotTime === item.Time ? 'bg-primary text-white' : 'text-gray-600 border border-gray-400'}`}
                >
                  {item.Time.toLowerCase()}
                </p>
              ))}
          </div>

           <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`text-sm rounded-full px-4 py-3 my-6 ${slotTime ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
            Book an Appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Appointment;

