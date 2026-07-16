import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets2 } from '../assets/assets_frontend/assets2';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const endpoint = state === 'sign up' ? 'register' : 'login';
      const payload = state === 'sign up' ? { name, email, password } : { email, password };
      const { data } = await axios.post(`${backendUrl}/api/user/${endpoint}`, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(state === 'sign up' ? 'Account created successfully' : 'Login successful. Redirecting to dashboard...');
        navigate('/home', { replace: true });
      } else {
        toast.error(data.message || 'Authentication failed');
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Network connection failed. Please try again.');
      } else if (error.response.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(error.response?.data?.message || 'Authentication failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setState((current) => current === 'Login' ? 'sign up' : 'Login');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <main className='login-page min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden'>
      <section className='relative min-h-0 bg-primary px-8 py-5 sm:px-12 lg:px-16 flex flex-col justify-between text-white'>
        <img className='w-40 brightness-0 invert' src={assets2.logo} alt='Prescripto' />
        <div className='max-w-xl py-3'>
          <p className='text-sm font-medium tracking-widest uppercase text-indigo-100 mb-3'>Your health, simplified</p>
          <h1 className='text-3xl sm:text-4xl font-semibold leading-tight'>Welcome Back</h1>
          <h2 className='text-xl sm:text-2xl font-medium mt-4'>Book appointments with trusted doctors</h2>
          <p className='text-indigo-100 mt-4 max-w-md leading-relaxed'>Manage your healthcare easily from one place.</p>
          <img className='w-full max-w-md max-h-[34vh] mt-4 object-contain' src={assets2.header_img} alt='Healthcare professionals' />
        </div>
        <p className='text-sm text-indigo-100'>Trusted care. Simple appointments.</p>
      </section>

      <section className='min-h-0 px-5 py-4 sm:px-10 lg:px-16 flex items-center justify-center bg-gray-50'>
        <form onSubmit={onSubmitHandler} className='login-card w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl' noValidate={false}>
          <div className='mb-8'>
            <p className='text-sm font-semibold text-primary mb-2'>{state === 'sign up' ? 'GET STARTED' : 'WELCOME BACK'}</p>
            <h2 className='text-3xl text-gray-900 font-semibold'>{state === 'sign up' ? 'Create your account' : 'Sign in to Prescripto'}</h2>
            <p className='text-gray-500 mt-2 text-sm'>{state === 'sign up' ? 'Join Prescripto to manage your healthcare.' : 'Enter your details to access your healthcare dashboard.'}</p>
          </div>

          {state === 'sign up' && (
            <div className='mb-5'>
              <label htmlFor='user-name' className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
              <input id='user-name' required autoComplete='name' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter your full name' className='login-input w-full px-4 py-3 rounded-xl border border-gray-300 outline-none placeholder:text-gray-400' />
            </div>
          )}

          <div className='mb-5'>
            <label htmlFor='user-email' className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <div className='relative'>
              <svg aria-hidden='true' className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.8' d='M3 7.5 10.4 13a2.7 2.7 0 0 0 3.2 0L21 7.5M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z' /></svg>
              <input id='user-email' required autoComplete='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='you@example.com' className='login-input w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none placeholder:text-gray-400' />
            </div>
          </div>

          <div className='mb-7'>
            <label htmlFor='user-password' className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <div className='relative'>
              <svg aria-hidden='true' className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.8' d='M7 10V8a5 5 0 0 1 10 0v2m-11 0h12a2 2 0 0 1 2 2v7H4v-7a2 2 0 0 1 2-2Z' /></svg>
              <input id='user-password' required autoComplete={state === 'Login' ? 'current-password' : 'new-password'} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' className='login-input w-full pl-12 pr-16 py-3 rounded-xl border border-gray-300 outline-none placeholder:text-gray-400' />
              <button type='button' onClick={() => setShowPassword((visible) => !visible)} className='absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded' aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <button type='submit' disabled={isSubmitting} className='w-full min-h-12 bg-primary text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'>
            {isSubmitting && <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin' aria-hidden='true' />}
            {isSubmitting ? (state === 'sign up' ? 'Creating Account...' : 'Signing In...') : (state === 'sign up' ? 'Create Account' : 'Sign In')}
          </button>

          <p className='mt-6 text-center text-sm text-gray-500'>
            {state === 'sign up' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type='button' onClick={switchMode} className='text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded'>{state === 'sign up' ? 'Sign in' : 'Create account'}</button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
