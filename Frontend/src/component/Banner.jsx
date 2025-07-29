import React, { use } from 'react'
import { assets2 } from '../assets/assets_frontend/assets2'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const Banner = () => {

  const navigate = useNavigate();
    
  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 md:mx-10 '>

        {/* left side */}

      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:pl-5 '>
      <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold mb-4'>
    <p >Book Appointment</p>
    <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button  onClick={()=>{navigate('/login'); scrollTo(0,0)}}className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 trasition-all '> Create Account</button>
        </div>
        
        {/* right side */}

        <div className='hidden md:block md:w-1/2  lg:w-[370px] relative'>
          <img className='w-full  right-0 max-w-md' src={assets2.appointment_img} alt="appointment_img" />
        </div>
    </div>
  )
}

export default Banner