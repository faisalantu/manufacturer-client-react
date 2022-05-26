import React from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product,isBtn }) => {
  const { title, _id, description, price, quantity, imageUrl } = product;
  return (
    <div>
      <div className='card bg-base-100 shadow-xl relative my-5 '>
        <figure className="h-56 overflow-hidden bg-white p-4">
          <img
          className="object-cover h-full mx-auto"
            src={imageUrl}
            alt='light'
          />
        </figure>
        <div className='card-body mb-8'>
          <h2 className='card-title line-clamp-2'>
            {title && title}
          </h2>
          <p className="line-clamp-4">
          {description && description}
          </p>
          <div className='card-actions justify-end'>
            {/* <div className='badge'>Rating: 2/5</div> */}
          </div>
          <p className='font-semibold'>Available: {quantity && quantity}</p>
          <p className='font-semibold'>Price: {price && price}$</p>
        </div>
        <div className={`card-actions absolute bottom-0 left-0 right-0 ${isBtn?null:"hidden"}`}>
          <Link disabled={+quantity<100} to={`dashboard/addorder/${_id}`} className='btn btn-primary w-full rounded-none'>Order Now</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
