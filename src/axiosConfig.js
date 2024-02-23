// axiosConfig.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.interceptors.request.use(function (request) {
  var token = localStorage.getItem("token");
  if (!token) {
    console.log("there is no token");
  } else {
    request.headers.set("Authorization", "Bearer " + token);
  }

  return request;
});

axios.interceptors.response.use(
  function (response) {
    if (response.data && response.data.success) {
      const navigate = useNavigate();
      navigate("/dashboard");
    }

    return response;
  },
  function (error) {
    console.log(error);

    const navigate = useNavigate();
    if (error.response.status === 401 || error.response.status === 403) {
      console.log("Unauthorized or Forbidden");

      navigate("/authentication/sign-in");
    }

    return Promise.reject(error);
  }
);

export default axios;
