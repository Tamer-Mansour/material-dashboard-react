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
import { useNavigate } from "react-router-dom";

const CreateCodeChallenges = () => {
  const [chapterId, setChapterId] = useState("");
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [constrains, setConstrains] = useState("");
  const [functionSignature, setFunctionSignature] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [chapterError, setChapterError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [goalError, setGoalError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [constrainsError, setConstrainsError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async () => {
    let hasError = false;
    if (!chapterId) {
      setChapterError("Chapter is required");
      hasError = true;
    } else {
      setChapterError("");
    }

    if (!title) {
      setTitleError("Title is required");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!goal) {
      setGoalError(true);
      hasError = true;
    } else {
      setGoalError(false);
    }

    if (!description) {
      setDescriptionError(true);
      hasError = true;
    } else {
      setDescriptionError(false);
    }

    if (!constrains) {
      setConstrainsError(true);
      hasError = true;
    } else {
      setConstrainsError(false);
    }

    if (hasError) {
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/content/coding_challenges/add/", {
        chapter: chapterId,
        title,
        goal,
        description,
        constrains,
        function_signature: functionSignature,
        code,
        testcases: testCases,
      });
      navigate("/chapters");
      // Handle success, e.g., redirect to a new page or show a success message
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error adding code challenge:", error.response.data.error);
        // Handle specific error message returned by the server
      } else {
        console.error("Error adding code challenge:", error.message);
        // Handle generic error message
      }
    }
  };

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
      setChapterId(value.id);
      setChapterError(""); // Clear chapter error when a chapter is selected
    } else {
      setChapterId("");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Add Code Challenge</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {/* chapter */}
              <Grid item xs={12}>
                <Card sx={{ minHeight: "50px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
                  {/* <Typography variant="h4">Select Chapter</Typography> */}
                  <Autocomplete
                    label="Select Chapter"
                    options={chapters}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <MDInput {...params} label="Chapter" />}
                    onChange={handleChapterChange}
                    required
                  />
                  {chapterError && (
                    <Typography variant="caption" color="error">
                      {chapterError}
                    </Typography>
                  )}
                </Card>
              </Grid>
              {/* code challenge title */}
              <Grid item xs={12}>
                <Card sx={{ minHeight: "50px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
                  <MDInput
                    label="Title"
                    size="large"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    error={!!titleError}
                    helperText={titleError}
                  />
                </Card>
              </Grid>
              {/* code challenge goal */}

              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">Goal</Typography>
                  <MDEditor data-color-mode="light" value={goal} onChange={setGoal} />
                  {goalError && (
                    <Typography variant="caption" color="error">
                      Goal is required
                    </Typography>
                  )}
                </Card>
              </Grid>
              {/* code challenge description */}
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">description</Typography>
                  <MDEditor data-color-mode="light" value={description} onChange={setDescription} />
                  {descriptionError && (
                    <Typography variant="caption" color="error">
                      Description is required
                    </Typography>
                  )}
                </Card>
              </Grid>
              {/* constrains */}
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">constrains</Typography>
                  <MDEditor data-color-mode="light" value={constrains} onChange={setConstrains} />
                  {constrainsError && (
                    <Typography variant="caption" color="error">
                      Constraints are required
                    </Typography>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* card 2 */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* code */}
                <Card
                  sx={{ minHeight: "300px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">Code</Typography>
                  <ReactMonaco
                    theme="light"
                    editorHeight={"400px"}
                    custom_code={code} // Make sure the prop name matches the state variable
                    isLoading={false}
                    onChange={(value) => setCode(value)} // Update the code state
                  />
                </Card>
              </Grid>
              <Grid item xs={12}>
                {/* Function Signature */}
                <Card
                  sx={{ minHeight: "300px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">Function Signature</Typography>
                  <ReactMonaco
                    theme="light"
                    editorHeight={"400px"}
                    custom_code={functionSignature}
                    isLoading={false}
                    onChange={(value) => setFunctionSignature(value)}
                  />
                </Card>
              </Grid>
              <Grid item xs={12}>
                {/* Test Cases */}
                <Card sx={{ minHeight: "50px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={2}>
                      <MDButton variant="gradient" color="success" fullWidth onClick={handleSubmit}>
                        Confirm
                      </MDButton>
                    </Grid>
                  </Grid>
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

export default CreateCodeChallenges;
