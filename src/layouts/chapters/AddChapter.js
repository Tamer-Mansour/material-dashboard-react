import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";

function AddChapter() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/content/chapters/add/", {
        title: title,
      });

      // If request is successful, reset form fields and display success message
      setTitle("");
      setError("");
      alert("Chapter added successfully!");
    } catch (error) {
      // If request fails, display error message
      console.error("Error adding chapter:", error.response.data);
      setError(error.response.data.error);
    }
  };

  return (
    // <div>
    //
    // </div>
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h2">Add Chapter</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
              />
              {error && (
                <Typography variant="body1" style={{ color: "red" }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained" color="primary">
                Add Chapter
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6} lg={3}></Grid>
          <Grid item xs={12} md={6} lg={3}></Grid>
          <Grid item xs={12} md={6} lg={3}></Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}></Grid>
            <Grid item xs={12} md={6} lg={4}></Grid>
            <Grid item xs={12} md={6} lg={4}></Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddChapter;
