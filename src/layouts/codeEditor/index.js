import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import ReactMonaco from "./ReactMonaco";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import { Card, Grid, Typography, Paper } from "@mui/material";
import MDBox from "components/MDBox";
import MarkdownDisplay from "./MarkdownDisplay";
import MDSnackbar from "components/MDSnackbar";

const IDE = () => {
  const [code, setCode] = useState("");
  const [executionResult, setExecutionResult] = useState(null);
  const [packageCheckResult, setPackageCheckResult] = useState(null);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarTimestamp, setSnackbarTimestamp] = useState("");

  const checkPackage = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "node",
        version: "15.10",
      }),
    };

    const response = await fetch(
      "http://localhost:8000/api/piston/packages/install",
      requestOptions
    );
    const data = await response.json();
    setPackageCheckResult(data);
    setSnackbarText(data.error);
    console.log(data.error + " data.message");
    setSnackbarTimestamp(new Date().toLocaleString());
    if (data.success) {
      setSuccessSB(true);
      setErrorSB(false);
    } else {
      setSuccessSB(false);
      setErrorSB(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessSB(false);
    setErrorSB(false);
  };

  const executeCode = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "js",
        version: "15.10.0",
        files: [
          {
            name: "my_cool_code.js",
            content: code, // Pass the code content
          },
        ],
        stdin: "",
        args: ["1", "2", "3"],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    };

    const response = await fetch("http://localhost:8000/api/piston/execute", requestOptions);
    const data = await response.json();
    setExecutionResult(data); // Update the execution result
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant="h3">User Details</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MDButton variant="gradient" color="info" onClick={checkPackage}>
                  Check JavaScript Package
                </MDButton>
              </Grid>
              <Grid item xs={6}>
                <MDButton variant="gradient" color="info" onClick={executeCode}>
                  Execute Code
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "500px", maxHeight: "900px", overflowY: "auto", padding: 2 }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      {/* Include ReactMonaco component */}
                      <ReactMonaco
                        theme="light"
                        editorHeight={"400px"}
                        customCode={code} // Pass the code content
                        isLoading={false}
                        onChange={setCode} // Pass onChange handler to update code content
                      />
                    </Grid>
                    {/* Other grid items */}
                    <Grid item xs={12}>
                      {/* Display execution result */}
                      {executionResult && (
                        <Card>
                          <Grid container spacing={3}>
                            {/* error */}
                            {executionResult.run.stderr ? (
                              <Grid item xs={12}>
                                <Paper
                                  elevation={3}
                                  sx={{ padding: 2, backgroundColor: "#fdecea", color: "#CB3C39" }}
                                >
                                  <Typography variant="h6" color="error">
                                    Execution Error:
                                  </Typography>
                                  <MarkdownDisplay
                                    content={`\`\`\`sh\n${executionResult.run.stderr}\n\`\`\``}
                                  />
                                </Paper>
                              </Grid>
                            ) : (
                              <>
                                {/* stdout */}
                                <Grid item xs={12}>
                                  <Paper
                                    elevation={3}
                                    sx={{ padding: 2, backgroundColor: "#ffffff" }}
                                  >
                                    <Typography variant="h6" color="textPrimary">
                                      Stdout:
                                    </Typography>
                                    <MarkdownDisplay
                                      content={`\`\`\`sh\n${executionResult.run.stdout}\n\`\`\``}
                                    />
                                  </Paper>
                                </Grid>
                                {/* stderr */}
                                <Grid item xs={12}>
                                  <Paper
                                    elevation={3}
                                    sx={{ padding: 2, backgroundColor: "#ffffff" }}
                                  >
                                    <Typography variant="h6" color="textPrimary">
                                      Stderr:
                                    </Typography>
                                    <MarkdownDisplay
                                      content={`\`\`\`sh\n${executionResult.run.stderr}\n\`\`\``}
                                    />
                                  </Paper>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </Card>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      {/* MDSnackbar for package check result */}
      <MDSnackbar
        color={successSB ? "success" : "error"}
        icon={successSB ? "check" : "error"}
        title="Message"
        content={snackbarText}
        dateTime={snackbarTimestamp}
        open={successSB || errorSB}
        onClose={handleCloseSnackbar}
        close={handleCloseSnackbar}
        bgWhite
      />
      <Footer />
    </DashboardLayout>
  );
};

export default IDE;
