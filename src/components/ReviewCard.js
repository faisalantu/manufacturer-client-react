import React from "react";

const ReviewCard = ({ review,secq }) => {
  const {  rating, description, displayName } = review;
  return (
    <div className='card bg-base-100 shadow-xl my-5 p-4'>
      <div className=''>
        <div className=''>
          <div className='avatar flex justify-center'>
            <div className='w-24 mask mask-hexagon'>
              <img
                src={`https://api.lorem.space/image/face?hash=${secq}`}
                alt='sd'
              />
            </div>
          </div>
          <h1 className='font-semibold text-xl text-center mt-2'>
            {displayName && displayName}
          </h1>
        </div>
        <div className='card-body mb-5 text-center '>
          <p className='line-clamp-4'>{description && description}</p>
          <div className='rating flex justify-center'>
            {Array.from({ length: 5 }, (_, i) => {
              if(i<+rating){
                return (
                  <input
                    key={i}
                    disabled
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-orange-400'
                  />
                );
              }else{
                return (
                  <input
                    key={i}
                    disabled
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-orange-200'
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
