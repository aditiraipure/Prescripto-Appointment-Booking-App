import React, { use, useEffect } from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';

const Login = () => {

const {backendUrl , token , setToken} = useContext(AppContext)
const navigate= useNavigate()

  const [state, setState] = useState('sign up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName ] =useState('')

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    if (state === 'sign up') {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        password,
        email,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else if (state === 'Login') {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        password,
        email,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
         toast.success("Login successful");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(()=>{
if(token){
   navigate('/')
}
},[token])

  return (
    
<form onSubmit={onSubmitHandler}>
  <div className="flex items-center justify-center">
    <div className="w-full max-w-md p-8 rounded-lg shadow-md border-2">
      <p className="text-2xl text-gray-800 font-semibold mb-6">
        {state === 'sign up' ? 'Create Account' : 'Login'}
      </p>

      {state === 'sign up' && (
        <>
          <div className="flex gap-5 mb-6">
        <button className="w-1/2 flex items-center justify-center border border-gray-600 text-gray-800 py-2 px-4 rounded-lg hover:bg-primary hover:text-white">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5 mr-2"
            alt="Google"
          />
          Log in with Google
        </button>
        <button className="w-1/2 flex items-center justify-center border border-gray-600 text-gray-800 py-2 px-4 rounded-lg hover:bg-primary hover:text-white">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
       className="h-5 w-5 mr-2"
       alt="Apple"
/>
          Log in with Apple
        </button>
      </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-4 text-sm">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Full Name Input */}
          <div className="mb-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1">
              Full Name:
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
          Email:
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
          Password:
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Options */}
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center text-sm text-gray-800">
          <input type="checkbox" className="mr-2 bg-primary" />
          Remember me
        </label>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button type='submit' className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        {state === 'sign up' ? 'Create Account' : 'Login'}
      </button>

      {/* Switch Link */}
      <div className="mt-4 text-center">
        {state === 'sign up' ? (
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an Account?{' '}
            <a onClick={() => setState('Login')} href="#" className="text-blue-500 hover:underline">
              Login Here
            </a>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account yet?{' '}
            <a onClick={() => setState('sign up')} href="#" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        )}
      </div>
    </div>
  </div>
</form>
    
  )
}
   
export default Login
