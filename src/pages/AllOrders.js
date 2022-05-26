import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";
import Loading from "../components/Loading";
import { useQuery } from "react-query";

const AllOrders = () => {
  // eslint-disable-next-line
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [fetchingProduct, setFetchingProduct] = useState(false);

  const {
    isLoading,
    data: orders,
    refetch,
  } = useQuery("AllOrders", async () => {
    const res = await axios.get(`/order?skip=${page * 10}`);
    return res.data;
  });

  const fetchProductCount = async () => {
    try {
      setFetchingProduct(true);
      const res = await axios.get(`/order/ordercount`);
      setFetchingProduct(false);
      setTotalPage(res.data.totalOrderCount);
    } catch (err) {
      setFetchingProduct(false);
      toast.error("Something went wrong try again");
    }
  };

  const deliverOrder = async (id) => {
    try {
      await axios.put(`/order?orderId=${id}`, {
        deleverd: true,
      });
      refetch()
    } catch (err) {}
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [page]);
  useEffect(() => {
    fetchProductCount();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {fetchingProduct || isLoading ? (
        <Loading />
      ) : (
        <div className='my-10 overflow-x-auto'>
          <table className='table w-full lg:w-9/12 md:mx-auto text-sm text-left text-gray-500 dark:text-gray-300 shadow-lg rounded-lg  border'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  No
                </th>
                <th scope='col' className='px-6 py-3'>
                  Product name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Quantity
                </th>
                <th scope='col' className='px-6 py-3 '>
                  user
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((order, index) => {
                    return (
                      <tr
                        key={order._id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {index + 1}
                        </th>
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {order?.title && order?.title}
                        </th>
                        <td className='px-6 py-4 '>
                          {order?.status ? "Paid" : "not paid"}
                        </td>
                        <td className='px-6 py-4'>
                          {order?.quantity && order?.quantity}
                        </td>
                        <td className='px-6 py-4 '>
                          {order?.displayName && order?.displayName}
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <button
                          disabled={!order.status}
                            onClick={()=>{
                              deliverOrder(order._id)
                            }}
                            className={`btn btn-xs ${
                              order?.deleverd ? "bg-green-600 hover:bg-green-800" : ""
                            }`}
                          >
                            <div className='flex justify-center items-center'>
                              <span className='text-xs'>
                                {order?.deleverd ? "Delivered" : "Not Delivered"}
                              </span>
                            </div>
                          </button>
                          <DeleteModal
                            fetchProducts={refetch}
                            pid={order._id}
                            url='order/one'
                          />
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
          <div className='w-full my-5'>
            <div className=' flex justify-center'>
              <div className='btn-group'>
                {/* {pageContext.currentPage > 1 ? "<<Prev" : null} */}
                {Array.from({ length: Math.ceil(totalPage / 10) }, (_, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setPage(i);
                      }}
                      className={`btn ${
                        i + 1 === page + 1 ? "btn-active" : ""
                      } `}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
