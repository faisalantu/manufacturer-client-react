import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

// import CheckoutForm from './CheckoutForm';
import axios from '../axiosConfig';
import Loading from './../components/Loading';
import CheckoutForm from './../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_TcGkWcoku08cu5mp45b6dHvw00bEnG8iop');

const Payment = () => {
    const { id } = useParams();

    const {
      isLoading,
      data: order,
    } = useQuery("payOrder", async () => {
      const res = await axios.get(`/order/one?productId=${id}`);
      return res.data[0];
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className="text-success font-bold">Hello, {order.displayName}</p>
                    <h2 className="card-title">Please Pay for <span className='font-semibold text-gray-600'>{order.title}</span></h2>
                    <p>Quantity: <span className='text-orange-700'>{order.quantity}</span></p>
                    <p>Please pay: ${+order.price * +order.quantity}</p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} price={+order.price * +order.quantity} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;