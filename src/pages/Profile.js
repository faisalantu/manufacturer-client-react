import React, { useEffect } from "react";
import axios from "../axiosConfig";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";

const Profile = () => {
  const [user] = useAuthState(auth);

  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery("oneUser", async () => {
    const res = await axios.get(`/user/all?userEmail=${user?.email}`);
    console.log(res.data[0]);
    console.log(user.email);
    return res.data[0];
  });

  const { register, handleSubmit } = useForm();

  const submitProfile = async (fromData) => {
    const data = {
      address: fromData.address,
      displayName: fromData.displayName,
    };

    try {
      await axios.put(`/user?userId=${userData._id}`, data);
    } catch (err) {}
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [user]);
  if (isLoading) return <Loading />;
  return (
    <div className='md:py-10 md:my-10'>
      <div className='lg:w-6/12 mx-auto text-gray-700 mt-10 '>
        <div className=' md:w-7/12 mx-auto bg-white p-5 rounded-lg shadow-lg'>
          <form onSubmit={handleSubmit(submitProfile)}>
            <div className='mb-6'>
              <input
                required
                {...register("displayName")}
                defaultValue={
                  userData?.displayName
                    ? userData?.displayName
                    : user.displayName
                }
                type='text'
                className='input w-full'
                placeholder='Full Name'
              />
            </div>
            <div className='mb-6'>
              <input
                
                defaultValue={userData?.email}
                required
                type='text'
                className='input w-full'
                placeholder='Email address'
                disabled
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='text'
                className='input w-full'
                placeholder='address'
                {...register("address")}
                defaultValue={userData?.address}
              />
            </div>

            <button className='btn w-full'>Update profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
