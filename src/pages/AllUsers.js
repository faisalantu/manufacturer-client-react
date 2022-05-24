import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useQuery } from "react-query";

const AllUsers = () => {
  // eslint-disable-next-line
  const [page, setPage] = useState(0);

  const {
    isLoading,
    data: allUsers,
    refetch,
  } = useQuery("allUsers", async () => {
    const res = await axios.get(`/user/all`);
    return res.data;
  });

  const makeAdmin = async (id) => {
    try {
      await axios.put(`/user/admin?userId=${id}`);
      toast.success("successfull")
      refetch()
    } catch (err) {
      toast.error("Something went wrong try again");
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='my-10 overflow-x-auto'>
          <table className='table w-full lg:w-9/12 md:mx-auto text-sm text-left text-gray-500 dark:text-gray-300 shadow-lg mb-5 rounded-lg border'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  No
                </th>
                <th scope='col' className='px-6 py-3'>
                  User Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3 text-right'>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers
                ? allUsers.map((user,index) => {
                    return (
                      <tr
                        key={user._id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {index+1}
                        </th>
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {user?.email && user?.email}
                        </th>
                        <th
                          scope='row'
                          className={`px-6 py-4 font-medium text-gray-900 dark:text-white ${user?.isAdmin? "text-red-500":null}`}
                        >
                          {user?.isAdmin?"Admin":"Not Admin"}
                        </th>

                        <td className='px-6 py-4 text-right'>
                          <button
                          onClick={()=>{
                            makeAdmin(user._id)
                          }}
                            className={`btn btn-xs ${user?.isAdmin?"btn-error ":null}`}
                          >
                            <div className={`flex justify-center items-center`}>
                              <MdOutlineEdit />{" "}
                              {user?.isAdmin?<span className='text-xs'>Remove Admin</span>:<span className='text-xs'>Make Admin</span>}
                            </div>
                          </button>
                          
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllUsers;
