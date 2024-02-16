import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Card, Autocomplete } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import ReactMonaco from "layouts/codeEditor";
import Markdown from "examples/markdown";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDEditor from "@uiw/react-md-editor";

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

  const handleSubmit = async () => {
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
                  />
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
                  />
                </Card>
              </Grid>
              {/* code challenge goal */}

              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">Goal</Typography>
                  <MDEditor value={goal} onChange={setGoal} />
                </Card>
              </Grid>
              {/* code challenge description */}
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">description</Typography>
                  <MDEditor value={description} onChange={setDescription} />
                </Card>
              </Grid>
              {/* constrains */}
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Typography variant="h6">constrains</Typography>
                  <MDEditor value={constrains} onChange={setConstrains} />
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
                    custom_code={functionSignature} // Make sure the prop name matches the state variable
                    isLoading={false}
                    onChange={(value) => setFunctionSignature(value)} // Update the functionSignature state
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
