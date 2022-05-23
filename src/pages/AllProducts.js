import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const AllProducts = () => {
  // eslint-disable-next-line
  const [fetchingProduct, setFetchingProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProducts = async () => {
    try {
      setFetchingProduct(true);
      const res = await axios.get(`/product?skip=${page * 10}`);
      setFetchingProduct(false);
      setProducts(res.data);
    } catch (err) {
      setFetchingProduct(false);
      toast.error("Something went wrong try again");
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page]);
  useEffect(() => {
    (async function () {
      try {
        setFetchingProduct(true);
        const res = await axios.get(`/product/productcount`);
        setFetchingProduct(false);
        setTotalPage(res.data.totalProducts);
      } catch (err) {
        setFetchingProduct(false);
        toast.error("Something went wrong try again");
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {fetchingProduct ? (
        <Loading />
      ) : (
        <div className='my-10'>
          <table className=' table-fixed w-full lg:w-9/12 md:mx-auto text-sm text-left text-gray-500 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden border'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Product name
                </th>
                <th scope='col' className='px-6 py-3 hidden md:block'>
                  Price
                </th>
                <th scope='col' className='px-6 py-3'>
                  Quantity
                </th>
                <th scope='col' className='px-6 py-3  hidden md:block'>
                  user
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products
                ? products.map((product) => {
                    return (
                      <tr
                        key={product._id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {product?.title && product?.title}
                        </th>
                        <td className='px-6 py-4 hidden md:block '>
                          ${product?.price && product?.price}
                        </td>
                        <td className='px-6 py-4'>
                          {product?.quantity && product?.quantity}
                        </td>
                        <td className='px-6 py-4  hidden md:block'>
                          {product?.displayName && product?.displayName}
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <Link
                            to={`/inventory/${product._id}`}
                            className='btn btn-xs'
                          >
                            <div className='flex justify-center items-center'>
                              <MdOutlineEdit />{" "}
                              <span className='text-xs'>Edit</span>
                            </div>
                          </Link>
                          <DeleteModal
                            fetchProducts={fetchProducts}
                            pid={product._id}
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
                    <>
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
                    </>
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

export default AllProducts;
