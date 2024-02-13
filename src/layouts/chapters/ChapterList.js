import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";

function ChapterList() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Fetch chapters data when the component mounts
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h2">Chapter List</Typography>
            <List>
              {chapters.map((chapter) => (
                <ListItem key={chapter.id}>
                  <ListItemText primary={chapter.title} />
                </ListItem>
              ))}
            </List>
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

export default ChapterList;
