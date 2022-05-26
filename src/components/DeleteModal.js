import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import axios from "../axiosConfig";
const DeleteModal = ({ pid,fetchProducts,url,status }) => {
  const [showModal, setShowModal] = useState(false);
  const onDelete = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const data = {
      productId: pid,
    };
    try {
      await axios.delete(url?url:"/product/one", {
        data: data,
      });

      toast.success("Product Deleted");
      fetchProducts()
      // window.location.reload();
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <button
      disabled={status?status:false}
        onClick={() => setShowModal(true)}
        className='btn btn-secondary btn-xs ml-2'
      >
        <div className='flex justify-center items-center'>
          <MdDelete /> <span className='text-xs'>Delete</span>
        </div>
      </button>
      {showModal ? (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full">
          <div className=' bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
            <div className='bg-gray-50 px-16 py-14 rounded-md text-center shadow-2xl border border-gray-50'>
              <h1 className='text-lg mb-4 font-bold text-gray-700'>
                Are you sure you want to delete?
              </h1>
              <button
                onClick={() => setShowModal(false)}
                className='btn btn-sm mt-5 rounded-md'
              >
                CLOSE
              </button>
              <button
                onClick={onDelete}
                className='btn btn-sm btn-error ml-5 rounded-md'
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteModal;
