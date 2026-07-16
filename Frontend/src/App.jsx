import React from 'react'
import './index.css';
import { Routes , Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Appointment from './pages/Appointment';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className={isLoginPage ? '' : 'mx-4 sm:mx-[10%]'}>
      <ToastContainer position='top-right' autoClose={3000} />
      {!isLoginPage && <NavBar />}
    <Routes>
     <Route path='/' element={<Login/>} />
     <Route path='/home' element={<Home/>} />
     <Route path='/doctors' element={<Doctors/>} />
     <Route path='/doctors/:speciality' element={<Doctors/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/about' element={<About/>} />
     <Route path='/contact' element={<Contact/>} />
     <Route path='my-profile' element={<MyProfile/>} />
    <Route path='/my-appointments' element={<MyAppointments/>} />
    <Route path="/appointment/:docId" element={<Appointment />} />
    </Routes>
    {!isLoginPage && <Footer />}
    </div>
  )
}


export default App
