import { useEffect, useState } from "react";
import axios from "../axiosConfig";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email: email };
    const postUser = async () => {
      if (email) {
        const res = await axios.put("/user", currentUser);
        console.log(res);
        setToken(res.data);
      }
    };
    postUser();
  }, [user]);
  return [token];
};

export default useToken;
