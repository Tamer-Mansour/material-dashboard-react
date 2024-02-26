import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Card, Autocomplete } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDEditor from "@uiw/react-md-editor";
import ReactMonaco from "layouts/codeEditor/ReactMonaco";
import { useParams } from "react-router-dom";

const EditCourse = () => {
  const {id} = useParams();
  const [course, setCourse] = useState({
    title: "",
    chapter: "",
    description: "",
    instructor: "",
    // Add other fields as needed
  });

  const [chapters, setChapters] = useState([]);
  const [chapterError, setChapterError] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/content/courses/get_course_by_id/${id}/`);
        const courseData = response.data;
        setCourse({
          title: courseData.title,
          chapter: courseData.chapter.id,
          description: courseData.description,
          instructor: courseData.instructor,
          // Set other fields
        });
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/content/chapters/");
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchCourseData();
    fetchChapters();
  }, [id]);

  const handleChapterChange = (event, value) => {
    if (value) {
      setCourse({ ...course, chapter: value.id });
      setChapterError(""); 
    } else {
      setCourse({ ...course, chapter: "" });
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!course.chapter) {
      setChapterError("Chapter is required");
      hasError = true;
    } else {
      setChapterError("");
    }

    // Validate other fields as needed

    if (hasError) {
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/content/courses/update_course/${id}/`, course);
      // Handle success, e.g., redirect to a new page or show a success message
    } catch (error) {
      console.error("Error updating course:", error);
      // Handle error
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Edit Course</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ minHeight: "50px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
                  <Autocomplete
                    label="Select Chapter"
                    options={chapters}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <MDInput {...params} label="Chapter" />}
                    onChange={handleChapterChange}
                    value={chapters.find((ch) => ch.id === course.chapter) || null}
                    required
                  />
                  {chapterError && (
                    <Typography variant="caption" color="error">
                      {chapterError}
                    </Typography>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ minHeight: "50px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
                  <MDInput
                    label="Title"
                    size="large"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    required
                    error={!!titleError}
                    helperText={titleError}
                  />
                </Card>
              </Grid>
              {/* Add other form fields as needed */}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Add other form fields as needed */}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default EditCourse;
