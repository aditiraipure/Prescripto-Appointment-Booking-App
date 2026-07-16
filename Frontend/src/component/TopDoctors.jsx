import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const TopDoctors = () => {
    const {doctors} = useContext(AppContext);
    const navigate = useNavigate(); 

    return (
    <div className='flex flex-col  item-center justify-center gap-4 my-16 text-gray-900  md:mx-10'>
        <h1 className='text-3xl text-center font-medium '>Top Doctors to Book</h1>
        <p className='m-auto text-sm'>Simply browse through the extensive List trusted of Doctors</p>
        <div className='w-full grid grid-cols-auto gap-4  pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0, 10).map((doctor, index) => (
            <div onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer  hover:translate-y-[-10px] trasition-all duration-500' key={index} >
            <img className='bg-blue-50 ' src={doctor.image} alt="doctor.image"  />
            <div className='p-4'>
            <div className='flex items-center  gap-2 text-sm text-green-500'>
            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
            </div>
            <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
            <p className='text-gray-900 text-sm' >{doctor.speciality}</p>
            </div>
            </div>
        ))}
        </div>
        <div className='flex justify-center'> 
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className=' bg-blue-200 text-gray-800 px-12 py-3 rounded-full mt-10 flex  gap-2  text-sm   hover:scale-105 ' >View All</button>
        </div>
    </div>
  )
}

export default TopDoctors