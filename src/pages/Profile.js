import React from "react";

const Profile = () => {
  return (
    <div className='md:py-10 md:my-10'>
      <div className='lg:w-6/12 mx-auto text-gray-700 mt-10 '>
        <div className=' md:w-7/12 mx-auto bg-white p-5 rounded-lg shadow-lg'>
          <form>
            <div className='mb-6'>
              <input
                required
                type='text'
                className='input w-full'
                placeholder='Full Name'
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='text'
                className='input w-full'
                placeholder='Email address'
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='password'
                className='input w-full'
                placeholder='Password'
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='password'
                className='input w-full'
                placeholder='Password'
              />
            </div>

            <button className='btn w-full'>
              Update profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
