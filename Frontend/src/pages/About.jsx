import React from 'react'
import { assets2} from '/src/assets/assets_frontend/assets2'

const About = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-2 my-5 text-gray-900  text-2xl md:mx-10'>
        <p>ABOUT US</p>
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-12  text-gray-900  md:mx-10'>
        <img className='w-full md:max-w-[360px]' src={assets2.about_image} alt="about_image" />
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 text-sm text-gray-600 bg-white sm:mx-0 mt-[-80px] sm:mt-0 '>
          <p>Welcome to Priscipto, your trusted partner in healthcare. Our mission is to connect patients with top-notch medical professionals and provide a seamless healthcare experience.</p>
          <br />
          <p>At Priscipto, we believe in the power of technology to transform healthcare. Our platform offers a user-friendly interface for booking appointments, accessing medical records, and managing prescriptions.We are committed to ensuring the highest standards of patient care and safety. Our team works tirelessly to verify the credentials of healthcare providers and maintain the integrity of our services.</p>
     <br />
     <h2 className="text-gray-800 font-semibold">Our Vision</h2>
          <p>Join us on this journey towards better health and wellness. Together, we can make healthcare more accessible and efficient for everyone.</p>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center gap-2 my-10 text-gray-900  text-2xl md:mx-10'>
        <p>WHY CHOOSE US</p>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-12  text-gray-900  md:mx-10'>
      <div className='flex-1 border border-gray-400 rounded-lg p-8  text-sm text-gray-900 bg-white sm:mx-0 mt-[-80px] sm:mt-0 hover:bg-primary hover:text-white transition-all duration-300  cursor-pointer '>
        <b>Efficiency:</b>
        <p>Streamlined appointments scheduling that fits into your busy life</p>
      </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8   text-sm text-gray-900 bg-white sm:mx-0 mt-[-80px] sm:mt-0  hover:bg-primary hover:text-white transition-all duration-300  cursor-pointer '>
        <b>Accessibility:</b>
        <p>Access healthcare services from the comfort of your home</p>
      </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8   text-sm text-gray-900 bg-white  sm:mx-0 mt-[-80px] sm:mt-0   hover:bg-primary hover:text-white transition-all duration-300  cursor-pointer'>
        <b>Quality Care:</b>
        <p>Connect with qualified healthcare professionals who prioritize your well-being</p>
      </div>
      </div>  
    </div>
  )
}

export default About
