import axios from "../axiosConfig";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";

const AddOrder = () => {
  const location = useLocation();
  const urlArr = location.pathname.split("/");
  const _id = urlArr[urlArr.length - 1];
  const tempValue = 100;
  const {
    register,
    handleSubmit,
    watch
  } = useForm();
  const [user] = useAuthState(auth);
  const [isUpdatingorder, setIsUpdatingOrder] = useState(false);

  const { isLoading: isLoadingUser, data: userData } = useQuery(
    "userProfile1",
    async () => {
      const res = await axios.get(`/user/all?userEmail=${user?.email}`);
      return res.data[0];
    }
  );

  const {
    isLoading,
    data: product,
    refetch: refetchProduct,
  } = useQuery("orderProduct", async () => {
    const res = await axios.get(`/product/one?productId=${_id}`);
    return res.data[0];
  });

  const submitOrder = async (fromData) => {
    const data = {
      address: fromData.address,
      displayName: userData?.displayName ? userData?.displayName : user.displayName,
      phone: fromData?.phone,
      email: userData.email,
      quantity: fromData?.quantity,
      productId: _id,
      title: product.title,
      price: product.price,
    };
    try {
      setIsUpdatingOrder(true);
      const res = await axios.post(`/order`, data);
      console.log(res);
      setIsUpdatingOrder(false);
      toast.success("order added");
      refetchProduct();
    } catch (err) {
      toast.error("something went wrong please try again");
      setIsUpdatingOrder(false);
    }
  };

  if (isLoading || isLoadingUser) return <Loading />;
  const { title, description, price, quantity, imageUrl } = product;
  return (
    <div className='flex flex-wrap items-center'>
      <div className='md:w-6/12 md:px-28'>
        {product && (
          <div className='card bg-base-100 shadow-xl relative my-5 '>
            <figure className='h-56 overflow-hidden bg-white p-4'>
              <img
                className='object-cover h-full mx-auto'
                src={imageUrl}
                alt='light'
              />
            </figure>
            <div className='card-body mb-8'>
              <h2 className='card-title line-clamp-2'>{title && title}</h2>
              <p className='line-clamp-4'>{description && description}</p>
              <div className='card-actions justify-end'>
                {/* <div className='badge'>Rating: 2/5</div> */}
              </div>
              <p className='font-semibold'>Available: {quantity && quantity}</p>
              <p className='font-semibold'>Price: {price && price}$</p>
            </div>
          </div>
        )}
      </div>
      <div className='md:w-6/12 md:px-28 w-full '>
        <form
          onSubmit={handleSubmit(submitOrder)}
          className='rounded-xl card bg-white shadow-lg border relative my-5'
        >
          <div className='card-body mb-8 '>
            <p>
              Please order more than{" "}
              <span className='text-rose-500 font-semibold'>{tempValue && tempValue}</span>
            </p>
            <p className='text-red-600 text-sm font-semibold'></p>
            <input
              {...register("quantity", {
                min: tempValue,
              })}
              type='number'
              name="quantity"
              placeholder='Quantity'
              className='input input-bordered input-primary'
              required
              // onChange={(e)=>{
              //   e.preventDefault()
              //   console.log(e.target.quantity)
              //   // setProductQuantity(e.input.value)
              // }}
            />
            <p className='text-sm text-red-500'>
              {watch("quantity") <= tempValue && "minimum order 100"}
            </p>
            <p className='text-sm text-red-500'>
              {watch("quantity") > +quantity && "That much product not available"}
            </p>
            <div className='divider'>AND</div>
            <input
              {...register("displayName")}
              type='text'
              placeholder='Name'
              className='input input-bordered input-primary'
              disabled
              defaultValue={
                userData?.displayName ? userData?.displayName : user.displayName
              }
            />
            <input
              {...register("email")}
              type='text'
              placeholder='Email'
              className='input input-bordered input-primary input-disabled'
              defaultValue={userData.email}
              disabled
            />
            <input
              {...register("address")}
              type='text'
              placeholder='Address'
              className='input input-bordered input-primary'
              required
            />
            <input
              {...register("phone")}
              type='text'
              placeholder='Phone Number'
              className='input input-bordered input-primary'
              required
            />
          </div>
          <div className={`card-actions absolute bottom-0 left-0 right-0`}>
            {console.log(+quantity < tempValue)}
            <button
              disabled={+quantity < tempValue || watch("quantity") < tempValue || watch("quantity") > +quantity}
              className={`btn btn-primary w-full rounded-none ${isUpdatingorder ? "loading" : ""}`}
            >
              {+quantity < tempValue?"Not Available for order":"Order Now"}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
