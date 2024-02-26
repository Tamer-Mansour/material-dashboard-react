import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/content/courses/get_all_courses/"
        );
        setCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  const handleAddCourse = () => {
    navigate("/courses/create");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDButton variant="gradient" color="info" onClick={handleAddCourse}>
              Add User
            </MDButton>
          </Grid>
          <Grid item sx={2}>
            <MDButton variant="gradient" color="info">
              Add course
            </MDButton>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              table={{
                columns: [
                  { Header: "Title", accessor: "title" },
                  { Header: "Description", accessor: "description" },
                  { Header: "Content", accessor: "content" },
                  { Header: "Chapter", accessor: "chapter" },
                  { Header: "Actions", accessor: "actions" },
                ],
                rows: courses.map((course) => ({
                  title: course.title,
                  description: course.description,
                  content: course.content,
                  chapter: course.chapter,
                  actions: (
                    <>
                      <MDButton variant="caption" color="text" href={`/course/${course.id}/edit`}>
                        View
                      </MDButton>
                    </>
                  ),
                })),
              }}
              canSearch={true}
              pagination={{ variant: "contained", color: "info" }}
              entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
              showTotalEntries={true}
              isSorted={true}
              noEndBorder={false}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Courses;
