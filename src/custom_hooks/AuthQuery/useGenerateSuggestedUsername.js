import { useEffect, useState } from "react";
import axios from "axios";

const useGenerateSuggestedUsername = (firstName, lastName) => {
  const [suggestedUsername, setSuggestedUsername] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const baseUsername = `${firstName.charAt(0).toLowerCase()}${lastName.charAt(0).toLowerCase()}`;
      let counter = 1;
      let username = `${baseUsername}${counter}`;

      const isUsernameAvailable = async (usernameToCheck) => {
        try {
          const response = await axios.get(`http://localhost:8000/api/auth/users/check-username/${usernameToCheck}/`);
          return response.data.available;
        } catch (error) {
          console.error("Error checking username availability:", error);
          // Handle error as needed
          return false;
        }
      };

      // Check if the suggested username is available using the API
      while (!(await isUsernameAvailable(username))) {
        counter++;
        username = `${baseUsername}${counter}`;
      }

      setSuggestedUsername(username);
    };

    fetchData();
  }, [firstName, lastName]);

  return suggestedUsername ? [suggestedUsername] : [];
};

export default useGenerateSuggestedUsername;
