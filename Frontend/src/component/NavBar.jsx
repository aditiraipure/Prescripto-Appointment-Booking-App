import { useContext } from 'react'
import {assets2} from '../assets/assets_frontend/assets2.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const NavBar = () => {

    const navigate = useNavigate();
    const {token ,setToken , userData} = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false);
    const logout=()=>{
      setToken(false)
      localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400 bg-white shadow-md p-4'>
       <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer' src={assets2.logo} alt="logo" />
       <ul className='hidden md:flex  items-start  gap-6 font-medium '>
       
            <NavLink to='/' >
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors' >
            <li className='py-1' >ALL DOCTORS</li  >
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about' >
            <li className='py-1' >ABOUT</li  >
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'  />
            </NavLink>
            <NavLink to='/contact' >
            <li className='py-1' >CONTACT</li  >
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
 
       </ul>
       <div className='flex items-center gap-4'>
        { token && userData ?
         <div className='flex items-center gap-1 cursor-pointer relative'>  
          <img className='w-8 rounded-full' src={userData.image} alt="Profile" />
          <img onClick={()=>setShowMenu(!showMenu)} className='w-2.5' src={assets2.dropdown_icon} alt="dropdown_icon" />
           {showMenu && (
   <div className='absolute top-full mt-2 right-1 text-base font-medium text-gray-600 z-10'>
    <div className='min-w-[10rem] bg-stone-100 rounded flex flex-col gap-2 p-4 shadow-lg'>
      <p onClick={() => { setShowMenu(false); navigate('my-profile'); }} className='hover:text-black cursor-pointer'>My Profile</p>
      <p onClick={() => { setShowMenu(false); navigate('my-appointments'); }} className='hover:text-black cursor-pointer'>My Appointments</p>
      <p onClick={() => { setShowMenu(false); logout(); }} className='hover:text-black cursor-pointer'>Log Out</p>
    </div>
  </div>
)}
          </div> :
            <button onClick={()=>navigate('/login')} className='bg-primary text-white py-2 px-6 font-light rounded-full hidden md:block '>Create Account </button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets2.menu_icon} alt="menu_icon" />

        {/* mobilemenu */}

      <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all  `}>
          <div className='flex items-center justify-between px-5'>
            <img  className='w-36 mt-5' src={assets2.logo} alt="logo" />
            <img className='w-7 mt-5' onClick={()=>setShowMenu(false)} src={assets2.cross_icon} alt="cross_icon" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5  px-5 text-lg font-medium'>
            <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>

            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>

            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>

            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
       </div>
    </div>
  )
}

export default NavBar
