import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

  const Doctors = () => {

  const [showFilter , setShowFilter]=useState(false)
  const [filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate()
  const {speciality} = useParams();
  const { doctors } = useContext(AppContext);

  const applyFilter =()=>{
     if(speciality){
       setFilterDoc(doctors.filter(doc=> doc.speciality === speciality))
     }
     else{
      setFilterDoc(doctors)
     }
  }

  useEffect(()=>{
      console.log("👨‍⚕️ Doctors from context:", doctors);
    applyFilter()
  },[doctors,speciality])
  
  return (
    <div className='flex flex-col'>
  <p className='text-gray-600'>Browse through the doctors specialist</p>
  <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
    <button
      className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
        showFilter ? 'bg-primary text-white ' : ''
      }`}
      onClick={() => setShowFilter((prev) => !prev)}
    >
      Filters
    </button>

    <div className={`flex-col gap-4 text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
      {[
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatricians',
        'Neurologist',
        'Gastroenterologist',
      ].map((spec) => (
        <p
          key={spec}
          onClick={() => (speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
          className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
            speciality === spec ? 'bg-indigo-50 text-black' : ''
          }`}
        >
          {spec}
        </p>
      ))}
    </div>

    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
      {filterDoc.map((doctor, index) => (
        <div
          onClick={() => navigate(`/appointment/${doctor._id}`)}
          className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
          key={index}
        >
          <img className='bg-blue-50' src={doctor.image} alt='' />
          <div className='p-4'>
            <div className='flex items-center gap-2 text-sm text-green-500'>
              <p className='w-2 h-2 bg-green-500 rounded-full'></p>
              <p>Available</p>
            </div>
            <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
            <p className='text-gray-900 text-sm'>{doctor.speciality}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default Doctors
