import React from 'react'
import { assets2} from '/src/assets/assets_frontend/assets2'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-900 md:mx-10'>
        <p className='text-2xl'>CONTACT US</p>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-center gap-12  text-gray-900  md:mx-10'>
      <img className='w-full md:max-w-[360px]' src={assets2.contact_image} alt="contact_image" />
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 text-sm text-gray-600 bg-white sm:mx-0 mt-[-80px] sm:mt-0 '>
          <p className='text-xl font-semibold'>Our Office:</p>
          <p className='text-sm text-gray-600'>123 Health Street, Wellness City, HC 45678</p>
          <br />
          <p>Tel:(451) 555-0986</p>
          <br />
          <p>Email : prescripto01@gmail.com</p>
          <p className='font-semibold text-lg  text-gray-800'>Careers at prescripto</p>
          <p>learn more about our team and job opening.</p>
          <button className='text-black px-4 py-2 rounded mt-2 hover:bg-black hover:text-white border border-black transition-all duration-300'>explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
