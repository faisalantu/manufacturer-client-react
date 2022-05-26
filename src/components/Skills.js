import React from "react";
import {GiHospitalCross, GiToothbrush} from "react-icons/gi"
import {RiServiceFill,RiCustomerService2Fill} from "react-icons/ri"
const Skills = () => {
  return (
    <div className='container mx-auto'>
      <div className='text-center pt-5 font-bold text-5xl mt-10 px-5 '>
        <span>Our Services</span>
      </div>
      <div className='md:grid md:grid-cols-3 md:gap-5 my-16 px-3 md:px-0 '>
        <div
          style={{ height: "350px" }}
          className='w-60 bg-gray-50 shadow-md rounded-lg flex flex-col items-center text-center gap-4 px-2 mx-auto mb-5 md:mb-0'
        >
          <div className='w-44 h-44 rounded-full bg-gray-200 mt-7 flex justify-center items-center text-6xl'>
            <GiHospitalCross/>
          </div>
          <h1 className='text-xl font-semibold'>Quality Goods</h1>
          <p>We always delever quality goods to our clients</p>
        </div>
        <div
          style={{ height: "350px" }}
          className='w-60 bg-gray-50 shadow-md rounded-lg flex flex-col items-center text-center gap-4 px-2 mx-auto mb-5 md:mb-0'
        >
          <div className='w-44 h-44 rounded-full bg-gray-200 mt-7 flex justify-center items-center text-6xl'>
            <RiCustomerService2Fill/>
          </div>
          <h1 className='text-xl font-semibold'>24/7 Service</h1>
          <p>We are 24/7 available for our clients.</p>
        </div>
        <div
          style={{ height: "350px" }}
          className='w-60 bg-gray-50 shadow-md rounded-lg flex flex-col items-center text-center gap-4 px-2 mx-auto mb-5 md:mb-0'
        >
          <div className='w-44 h-44 rounded-full bg-gray-200 mt-7 flex justify-center items-center text-6xl'>
            <RiServiceFill/>
          </div>
          <h1 className='text-xl font-semibold'>Online Support</h1>
          <p>We always provide online support for our clients.</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;