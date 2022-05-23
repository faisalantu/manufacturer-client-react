import axios from "../axiosConfig";
import { useQuery } from "react-query";

const useAdmin = (user) => {

  const email = user?.email;

  const { isLoading, data:isAdmin, refetch } = useQuery("isAdmin", async () => {
    if(email){
      const res = await axios.get(`/user/admin`);
      console.log(res.data);
      return res.data;
    }
  });

  return [isAdmin?.admin, isLoading, refetch];
};
export default useAdmin;
