import axios from "../axiosConfig";
import React from "react";
import ProductCard from "../components/ProductCard";
import Banner from "./../components/Banner";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import ReviewCard from "./../components/ReviewCard";

const Home = () => {
  const { isLoading, data: products } = useQuery("homeProducts", async () => {
    const res = await axios.get(`/product?limit=6&sort=1`);
    return res.data;
  });

  const { isLoading: reviewLoading, data: reviews } = useQuery(
    "homeReviews",
    async () => {
      const res = await axios.get(`/review?limit=6&sort=-1`);
      return res.data;
    }
  );
  if (isLoading || reviewLoading) return <Loading />;
  return (
    <div className='md:px-36'>
      <Banner />

      <div
        className='flex justify-center md:my-14 mb-10 md:py-10 '
        data-aos='fade-up'
      >
        <div className='stats shadow'>
          <div className='stat'>
            <div className='stat-figure text-primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>Total Delivered</div>
            <div className='stat-value text-primary'>2.56M</div>
            <div className='stat-desc'>12% more than last year</div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>Processing Orders</div>
            <div className='stat-value text-secondary'>10.3K</div>
            <div className='stat-desc'>21% more than last month</div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <div className='avatar online'>
                <div className='w-16 rounded-full'>
                  <img
                    src='https://api.lorem.space/image/face?w=128&h=128'
                    alt='human'
                  />
                </div>
              </div>
            </div>
            <div className='stat-value'>86%</div>
            <div className='stat-title'>Tasks done</div>
            <div className='stat-desc text-secondary'>31 tasks remaining</div>
          </div>
        </div>
      </div>
      {/* flex justify-around flex-wrap md:gap-6  */}
      <div className='md:grid md:grid-cols-3 gap-10'>
        {products.map((product) => {
          return (
            <ProductCard key={product._id} product={product} isBtn={true} />
          );
        })}
      </div>
      <div>
        <h1 className='text-center mt-32 mb-5 font-bold text-5xl'>
          What Our Client Says
        </h1>
        <div className='md:grid md:grid-cols-3 gap-10'>
          {reviews.map((review, i) => {
            return <ReviewCard key={review._id} review={review} secq={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
