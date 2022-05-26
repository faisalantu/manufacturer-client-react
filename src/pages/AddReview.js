import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery("editProfile", async () => {
    const res = await axios.get(`/user/all?userEmail=${user?.email}`);
    return res.data[0];
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfile = async (fromData) => {
    const data = {
      title: fromData.title,
      email: fromData.email,
      displayName: fromData.displayName,
      description: fromData?.description,
      rating: fromData?.rating,
    };

    try {
      setIsUpdatingProfile(true);
      await axios.post(`/review`, data);
      toast.success("Review Added");
      setIsUpdatingProfile(false);
    } catch (err) {
      toast.error("something went wrong please try again");
      setIsUpdatingProfile(false);
    }
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
                className='input w-full disabled btn-disabled'
                placeholder='Full Name'
              />
            </div>
            <div className='mb-6'>
              <input
                {...register("email")}
                defaultValue={userData?.email}
                required
                type='text'
                className='input w-full btn-disabled'
                placeholder='Email address'
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='text'
                className='input w-full'
                placeholder='Title'
                {...register("title")}
              />
            </div>
            <div className='mb-6'>
              <input
                required
                type='number'
                className='input w-full'
                placeholder='Rating'
                {...register("rating", {
                  min: {
                    value: 0,
                    message: "cant be less than 0",
                  },
                  max: {
                    value: 5,
                    message: "cant be more than 5",
                  },
                })}
              />
              <p className="text-sm text-red-500 mt-1 py-0">{errors?.rating?.message}</p>
            </div>
            <p></p>
            <div className='mb-6'>
              <textarea
                required
                rows={4}
                className='textarea w-full'
                placeholder='description'
                {...register("description")}
              />
            </div>

            <button
              className={`btn w-full ${
                isUpdatingProfile ? "loading disabled" : ""
              }`}
            >
              Add Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
