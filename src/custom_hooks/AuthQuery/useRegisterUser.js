import axios from "axios";
import { useState } from "react";

const useRegisterUser = ({ onRegisterSuccess }) => {
  const registerUser = async (userData) => {
    console.log("userData   "+ JSON.stringify(userData));
    try {
      const response = await axios.post(`http://localhost:8000/api/auth/register/`, userData);
      // Assuming the response contains necessary information about the user
      onRegisterSuccess(response.data);
    } catch (error) {
      console.error("Registration failed", error);
      // Handle error, show a message, etc.
    }
  };

  return { registerUser };
};

export default useRegisterUser;