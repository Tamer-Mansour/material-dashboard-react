import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

function EditChapter() {
  const { id } = useParams();

  const [chapterTitle, setChapterTitle] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openConfirmEditDialog, setOpenConfirmEditDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/content/chapters/${id}/challenges/`
        );
        setChapterTitle(response.data.title);
        setChallenges(response.data.challenges);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };

    fetchChapter();
  }, [id]);

  const handleChangeChapterTitle = (event) => {
    setChapterTitle(event.target.value);
  };

  const handleEditChapterSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/content/chapters/${id}/edit/`, {
        title: chapterTitle,
      });
      navigate("/chapters");
    } catch (error) {
      console.error("Error editing chapter:", error);
    }
  };

  const handleDeleteChapter = async () => {
    setOpenConfirmDeleteDialog(true);
  };
  const handleEditChapter = async () => {
    setOpenConfirmEditDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/content/chapters/${id}/delete/`);
      navigate("/chapters");
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleCloseDeleteConfirmDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };
  const handleCloseEditConfirmDialog = () => {
    setOpenConfirmEditDialog(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: "600px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MDTypography variant="h3">Edit Chapter</MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      type="text"
                      label="Chapter Title"
                      value={chapterTitle}
                      onChange={handleChangeChapterTitle}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <MDButton variant="gradient" color="info" onClick={handleEditChapter}>
                      Save
                    </MDButton>
                  </Grid>
                  <Grid item xs={2}>
                    <MDButton variant="gradient" color="error" onClick={handleDeleteChapter}>
                      Delete
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: "600px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <MDTypography variant="h3">
                      All challenges into {chapterTitle} chapter
                    </MDTypography>
                  </Grid>
                  <Grid item xs={3}>
                    <MDButton variant="gradient" color="info" href="/challenge/create">
                     Create Code Challenge
                    </MDButton>
                  </Grid>
                </Grid>
                <DataTable
                  table={{
                    columns: [
                      { title: "title", accessor: "title", width: "80%" },
                      { Header: "Actions", accessor: "actions", width: "20%" },
                    ],
                    rows: challenges.map((challenge) => ({
                      title: challenge.title,
                      actions: (
                        <MDTypography
                          component="a"
                          href={`/challenge/${challenge.id}/edit`}
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
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Confirm Dialog for delete*/}
      <Dialog open={openConfirmDeleteDialog} onClose={handleCloseDeleteConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <MDTypography variant="body1">
            Are you sure you want to delete {chapterTitle} chapter?
          </MDTypography>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDeleteConfirmDialog} variant="gradient" color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleConfirmDelete} variant="gradient" color="error">
            Delete
          </MDButton>
        </DialogActions>
      </Dialog>
      {/* Confirm Dialog for edit */}
      <Dialog open={openConfirmEditDialog} onClose={handleCloseEditConfirmDialog}>
        <DialogTitle>Confirm edit</DialogTitle>
        <DialogContent>
          <MDTypography variant="body1">
            Are you sure you want to edit {chapterTitle} chapter?
          </MDTypography>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseEditConfirmDialog} variant="gradient" color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleEditChapterSubmit} variant="gradient" color="success">
            Confirm
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default EditChapter;
