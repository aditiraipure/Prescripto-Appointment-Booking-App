import React from 'react'
import './index.css';
import { Routes , Route } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div  className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <NavBar></NavBar>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/doctors' element={<Doctors/>} />
     <Route path='/doctors/:speciality' element={<Doctors/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/about' element={<About/>} />
     <Route path='/contact' element={<Contact/>} />
     <Route path='my-profile' element={<MyProfile/>} />
    <Route path='/my-appointments' element={<MyAppointments/>} />
    <Route path="/appointment/:docId" element={<Appointment />} />
    </Routes>
    <Footer></Footer>
    </div>
  )
}

export default App
