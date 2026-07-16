import React from 'react'
import { specialityData } from '/src/assets/assets_frontend/assets2'
import { Link } from 'react-router-dom'



const SpecialMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800' >
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className=' sm:w-1/3  text-center text-sm'>Simply browse thorough our extensive list of trusted doctors, schedule your appointments hassel-free</p>

      <div className='flex sm:justify-center flex-wrap gap-4 w-full  overflow-x-auto sm:overflow-x-hidden text-center '>
     { specialityData.map((item , index ) => (

        <Link  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='flex flex-col text-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] trasition-all duration-500' 
        key={index} to={`/doctors/${item.speciality}`}>
        <img className='w-16 sm:w-24 mb-2' src={item.image} />
        <p >{item.speciality}</p>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default SpecialMenu