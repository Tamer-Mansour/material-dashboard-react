import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useUserQuery = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded;
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      }

      return null;
    };

    const fetchData = async () => {
      const decodedToken = decodeToken();

      if (decodedToken && decodedToken.user_id) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/auth/users/${decodedToken.user_id}/`
          );
          const userData = response.data;
          setUserData(userData);
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, loading, dataFetched };
};

export { useUserQuery };
