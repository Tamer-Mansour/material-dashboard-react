import { useQuery } from "react-query";
import axios from "axios";

const myurl = "http://localhost:8000/api/content/courses/get_all_courses/";

const useGetCourses = () => {
  return useQuery("coursesGetAll", () =>
    axios.get(myurl).then((res) => res.data)
  );
};

export { useGetCourses };
