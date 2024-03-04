import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Typography, Grid, Card, Autocomplete } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    chapter: "",
    title: "",
    description: "",
    content: "",
  });

  const [chapters, setChapters] = useState([]);
  const [chapterError, setChapterError] = useState("");
  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/content/chapters/");
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchChapters();
  }, []);

  const handleChapterChange = (event, value) => {
    if (value) {
      setCourse({ ...course, chapter: value.id });
      setChapterError(""); // Clear chapter error when a chapter is selected
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

    if (!course.title) {
      setTitleError("Title is required");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (hasError) {
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/content/courses/add_course/", course);
    } catch (error) {
      console.error("Error adding course:", error);
    }
    navigate("/courses")
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Create Course</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card sx={{ minHeight: "90px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
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
              <Grid item xs={6}>
                <Card sx={{ minHeight: "90px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
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
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">Description</Typography>
                  <MDEditor
                    value={course.description}
                    onChange={(value) => setCourse({ ...course, description: value })}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "300px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">Content (Markdown)</Typography>
                  <MDEditor
                    value={course.content}
                    onChange={(value) => setCourse({ ...course, content: value })}
                  />
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ minHeight: "50px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
                  <MDButton
                    variant="gradient"
                    color="success"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Confirm
                  </MDButton>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default CreateCourse;
