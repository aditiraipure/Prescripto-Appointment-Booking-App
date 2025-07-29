import { useContext, useEffect, useState } from 'react';
import '../index.css';
import { AppContext } from '../context/AppContext';
import { assets2 } from '../assets/assets_frontend/assets2';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [formData, setFormData] = useState({});

  // Sync local formData with global userData
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        address: userData.address || { line1: '', line2: '' },
        gender: userData.gender || '',
        dob: userData.dob || '',
      });
    }
  }, [userData]);

  const UpdateUserProfileData = async () => {
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('phone', formData.phone);
      payload.append('address', JSON.stringify(formData.address));
      payload.append('gender', formData.gender);
      payload.append('dob', formData.dob);
      if (image) payload.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, payload, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className='max-w-lg flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md'>
      {isEdit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img
              className='w-36 rounded opacity-75'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets2.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
        </label>
      ) : (
        <img className='w-36 rounded' src={userData.image} alt="Profile" />
      )}

      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-sm max-w-56 mt-4'
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          value={formData.name}
          type="text"
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-700 uppercase mt-4'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-50 max-w-32'
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              value={formData.phone}
              type="text"
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <>
              <input
                className='bg-gray-50'
                onChange={e => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value }
                }))}
                value={formData.address?.line1 || ''}
                type="text"
              />
              <br />
              <input
                className='bg-gray-50'
                onChange={e => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value }
                }))}
                value={formData.address?.line2 || ''}
                type="text"
              />
            </>
          ) : (
            <p className='text-gray-700'>
              {userData.address?.line1 || ''}<br />
              {userData.address?.line2 || ''}
            </p>
          )}
        </div>
      </div>

      <p className='text-neutral-700 uppercase mt-4'>Basic Information</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {isEdit ? (
          <select
            className='max-w-20 bg-gray-100'
            onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
            value={formData.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p className='text-gray-700'>{userData.gender}</p>
        )}

        <p className='font-medium'>Date of Birth:</p>
        {isEdit ? (
          <input
            className='max-w-28 bg-gray-100'
            onChange={e => setFormData(prev => ({ ...prev, dob: e.target.value }))}
            value={formData.dob || ''}
            type="date"
          />
        ) : (
          <p className='text-gray-700'>{userData.dob}</p>
        )}
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button
            className='border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 bg-gray-100 py-2 px-8'
            onClick={UpdateUserProfileData}
          >
            Save
          </button>
        ) : (
          <button
            className='border border-primary rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300 py-2 px-8'
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
