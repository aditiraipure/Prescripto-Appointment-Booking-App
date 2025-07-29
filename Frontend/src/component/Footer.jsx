import React from 'react'
import { assets2 } from '../assets/assets_frontend/assets2'

const Footer = () => {
  return (
    <div className=' md:mx-10 ' >
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left section */}
            <div>
              <img  className='mb-5 w-40'
              src={assets2.logo} alt="logo" />
              <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint voluptatem molestias possimus sequi nulla veniam accusamus, commodi illum ab ratione. </p>
            </div>

            {/* center section */}
            <div>
              <p className='text-xl font-medium mb-5'>COMPANY</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                <li>HOME</li>
                <li>ABOUT</li>
                <li>CONTACT-US</li>
                <li>PRIVACY POLICY</li>
              </ul>
            </div>

            {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>Get in touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>prescripto100@gmail.com</li>
                </ul>
            </div>
            </div>
            {/* copyright text */}
            <div>
            <hr/>
            <p className='py-5 text-sm text-center '>Copyright 2025@ prescripto - All rights Reserved</p>
            </div>
    </div>
  )
}

export default Footer