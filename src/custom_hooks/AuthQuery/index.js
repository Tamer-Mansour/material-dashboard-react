import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useReactQuery from "custom_hooks/useReactQuery";
import { useState } from "react";

const myurl = process.env.REACT_APP_AUTH_BASE_URL;

const useLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const loginMutation = useMutation(
    (loginData) => axios.post(`${myurl}login/`, loginData),
    {
      onSuccess: (data) => {
        const userRole = data.data.user_role;
        if (userRole !== "student") {
          setErrorMessage("Users with role other than 'student' are not allowed to log in.");
          return;
        }
        localStorage.setItem("token", data.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;
        navigate("/chapters");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return { ...loginMutation };
};

export default useLogin;
