import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable"; // Import the DataTable component
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";

function ChapterList() {
  const [chapters, setChapters] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch chapters data when the component mounts
    const fetchChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/content/chapters/get/");
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDTypography variant="h2">Chapters List</MDTypography>
          </Grid>
          <Grid item sx={2}>
            <MDButton variant="gradient" color="info" href={`chapters/add`}>
              Add Chapter
            </MDButton>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              table={{
                columns: [
                  { Header: "Title", accessor: "title", width: "20%" },
                  { Header: "Created Time", accessor: "createdTime", width: "20%" },
                  { Header: "Update Time", accessor: "updateTime" },
                  { Header: "Number of Challenges", accessor: "numberOfChallenges", width: "20%" },
                  { Header: "Actions", accessor: "actions", width: "20%" },
                ],
                rows: chapters.map((chapter) => ({
                  title: chapter.title,
                  numberOfChallenges: chapter.challenges.length,
                  createdTime: `${formatDate(chapter.created_at)}`,
                  updateTime: `${formatDate(chapter.updated_at)}`,
                  actions: (
                    <MDTypography
                      component="a"
                      href={`chapter/${chapter.id}/edit`}
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                    >
                      Edit
                    </MDTypography>
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
}

export default ChapterList;
