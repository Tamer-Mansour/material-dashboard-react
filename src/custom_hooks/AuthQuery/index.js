// useLogin.js

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const myurl = "http://localhost:8000/api/auth/";

const useLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    (loginData) => axios.post(`${myurl}login/`, loginData),
    {
      onSuccess: (data) => {
        const userRole = data.data.user_role;
        if (userRole !== "student") {
          setErrorMessage("Users with a role other than 'student' are not allowed to log in.");
          return;
        }
        localStorage.setItem("token", data.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;
        // Return a callback to handle navigation
        return () => navigate("/dashboard"); // Update the path accordingly
      },
      onError: (error) => {
        setErrorMessage("Login failed. Please check your credentials.");
        console.error(error);
      },
    }
  );

  return { ...loginMutation, errorMessage };
};

export default useLogin;
