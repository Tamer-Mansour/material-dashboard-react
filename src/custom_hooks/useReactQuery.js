import { useQuery } from "react-query";
import axios from "axios";

const useReactQuery = (queryName, requestUrl) => {
  return useQuery(
    [queryName],
    () =>
      axios.get(requestUrl).then((res) => {
        console.log("data : " + res.data);
        return res.data;
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
};

export default useReactQuery;
