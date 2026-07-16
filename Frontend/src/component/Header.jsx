import React from 'react'
import { assets2 } from '../assets/assets_frontend/assets2'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary
    rounded-lg px-6 md:px-10 lg:px-20 items-start '>

        {/* left side */}
        <div  className=' md:w-1/2 flex flex-col  item-start justify-center gap-4  py-10 m-auto md:py-[10vw]  md:mb-[-30px]  '>
           <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold md:leading-tight lg:leading-tight' >Book Appointments
            <br /> with Trusted Doctors </p>

            <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light'>
                <img className='w-28 '  src={assets2.group_profiles} alt="group_profiles" />
                <p>Simply browse thorough our extensive list of trusted doctors,<br className='hidden sm:block' /> I schedule your apppintments hassel-free </p>
            </div>
            <div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
            <a className='flex item-center gap-2 bg-white px-7 py-3 rounded-full text-gray-600 text-sm  md:m-0 hover:scale-105 trasition-all duration-300' href="#speciality">
                Book Appointment
                <img  className='w-3' src={assets2.arrow_icon} alt="" />
            </a>
            </div>
        </div>
        {/* right-side */}
        <div className='md:w-1/2 relative'>
        <img  className='w-full md:absolute top-0  h-auto rounded-lg' src={assets2.header_img} alt="header_img" />
        </div>
    </div>
  )
}

export default Header