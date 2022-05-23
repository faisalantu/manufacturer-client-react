import axios from "../../axiosConfig";
import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => {
    const email = user?.email;
    console.log(email);
    const checkAdminFnc = async () => {
      if (email) {
        try {
          setAdminLoading(true);
          const res = await axios.get("/user/admin");
          console.log(res.data);
          setAdmin(res?.data?.admin);
          console.log(res?.data?.admin);
          console.log(admin);
          setAdminLoading(false);
        } catch (err) {
          setAdmin(false)
        }
      }
    };
    checkAdminFnc();
  }, [user]);
  return [admin, adminLoading];
};
export default useAdmin;
