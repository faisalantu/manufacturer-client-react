import React from "react";
import bannerImg from "../assets/paintbrush.png";
const Banner = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center py-12 md:my-10 text-gray-800'>
      <div className='md:w-6/12 flex items-center justify-center flex-col md:pl-14'>
        <div className='my-10 md:mt-0'>
          <h1 className='text-3xl sm:text-6xl font-bold text-center md:text-left'>
            PAINT YOUR <br /> <span className='text-primary'> WORLD</span>
          </h1>
          <p className="mt-3 font-semibold text-gray-600 md:w-10/12 text-center md:text-left">
            We are a company with a long tradition of high-quality lighting
            products. Established in the early 20th Century, the Sasamiya brand
            has been known by several names, including Havells Sasamiya and
            Sasamiya Electric Products.
          </p>
        </div>
      </div>

      <div className='md:w-6/12 flex justify-center'>
        <img
          style={{ maxHeight: "550px" }}
          className=''
          src={bannerImg}
          alt='bulb'
        />
      </div>
    </div>
  );
};

export default Banner;
