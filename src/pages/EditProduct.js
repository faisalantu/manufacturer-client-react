import axios from "../axiosConfig";
import React, { useState } from "react";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Loading from './../components/Loading';

const EditProduct = () => {
  const [user] = useAuthState(auth);
  const [fetchingProduct, setFetchingProduct] = useState(false)
  const location = useLocation();
  const urlArr = location.pathname.split("/");
  const _id = urlArr[urlArr.length - 1];

  const { isLoading, data:product, refetch} = useQuery("product", async () => {
    const res = await axios.get(`/product/one?productId=${_id}`);
    return res.data[0];
});

  const {
    register,
    handleSubmit,
  } = useForm();


  const onSubmit = async (fromData) => {
    const data = {
      title: fromData.title,
      imageUrl: fromData.imageUrl,
      description: fromData.description,
      price: fromData.price,
      quantity: fromData.quantity,
      userEmail: user?.email,
      displayName: user?.displayName,
    };

    
    try {
      setFetchingProduct(true)
      toast.loading("Creating Product");
      const res = await axios.put(
        `/product?productId=${_id}`,
         data 
        
      );
      toast.dismiss()
      refetch()
      setFetchingProduct(false)
      toast.success(res?.data?.message)
    } catch (err) {
      setFetchingProduct(false)
      toast.dismiss()
      toast.error("Something went wrong try again")
    }
    
  };

  if(isLoading) return <Loading/>

  return (
    <div className='my-5 md:col-span-2'>
      <form
        className='shadow-lg border overflow-hidden rounded-lg lg:w-8/12 mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'
              >
                Title
              </label>
              <div className='mt-1'>
                <input
                  id='title'
                  {...register("title", { required: true })}
                  className='p-2 shadow-sm outline-none focus:ring-stone-500 focus:border-stone-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                  placeholder='Product Name'
                  defaultValue={product.title}
                  required
                  autoFocus
                />
              </div>
              <p className='mt-2 text-sm text-gray-500 select-none'>
                Good title for product.
              </p>
            </div>
            <div>
              <div className='col-span-3 sm:col-span-2'>
                <label
                  htmlFor='photoUrl'
                  className='block text-sm font-medium text-gray-700'
                >
                  Image url
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    http://
                  </span>
                  <input
                    id='photoUrl'
                    type='text'
                    className='border px-2 outline-none focus:border-stone-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.example.com'
                    {...register("imageUrl", { required: true })}
                    required
                    defaultValue={product.imageUrl}
                  />
                </div>
              </div>
            </div>

            <div className='flex'>
              <div className='w-6/12 pr-5'>
                <label
                  htmlFor='quantity'
                  className='block text-sm font-medium text-gray-700'
                >
                  Quantity
                </label>
                <div className='mt-1'>
                  <input
                    id='quantity'
                    className='p-2 shadow-sm outline-none focus:ring-stone-500 focus:border-stone-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                    placeholder='0'
                    defaultValue={product.quantity}
                    type='number'
                    {...register("quantity", { required: true })}
                    required
                  />
                </div>
              </div>
              <div className='w-6/12 lg:pl-5'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium text-gray-700'
                >
                  Price
                </label>
                <div className='mt-1'>
                  <input
                    id='price'
                    className='p-2 shadow-sm outline-none focus:ring-stone-500 focus:border-stone-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                    placeholder='0'
                    defaultValue={product.price}
                    type='number'
                    {...register("price", { required: true })}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Description
              </label>
              <div className='mt-1'>
                <textarea
                  id='description'
                  {...register("description", { required: true })}
                  rows={3}
                  className='p-2 shadow-sm outline-none focus:ring-stone-500 focus:border-stone-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                  placeholder='you@example.com'
                  defaultValue={product.description}
                  required
                />
              </div>
              <p className='mt-2 text-sm text-gray-500 select-none'>
                Brief description about the product.
              </p>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-100 text-right sm:px-6'>
            <button
              disabled={fetchingProduct}
              className='btn'
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
