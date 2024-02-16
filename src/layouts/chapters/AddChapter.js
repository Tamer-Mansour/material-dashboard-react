import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  TextField,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";

function AddChapter() {
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeNewChapterTitle = (event) => {
    setNewChapterTitle(event.target.value);
    setError("");
  };

  const handleAddChapterSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/content/chapters/add/", {
        title: newChapterTitle,
      });
      navigate("/chapters");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else if (error.request) {
        setError("No response from the server");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">Add Chapter</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ minHeight: "600px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="newChapterTitle"
                      label="Chapter Title"
                      type="text"
                      fullWidth
                      value={newChapterTitle}
                      onChange={handleChangeNewChapterTitle}
                      error={!!error}
                      helperText={error}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="gradient" color="info" onClick={handleAddChapterSubmit}>
                      Add Chapter
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddChapter;
