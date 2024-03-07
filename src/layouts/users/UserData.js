import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
import { useUserQuery } from "custom_hooks/AuthQuery/useUsersQuery";
import MDAvatar from "components/MDAvatar";

function UserData() {
  const { id } = useParams();
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarTimestamp, setSnackbarTimestamp] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const roles = ["student", "admin", "instructor"];
  const { userData, loading, dataFetched } = useUserQuery();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/users/${id}/`);
        setUser(response.data);
        setSelectedRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdateUser = () => {
    history(`/edit-user/${id}`);
  };

  const handleDeleteUser = async () => {
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/user/delete/${id}/`);
      setSuccessSB(true);
      setSnackbarText("User deleted successfully");
      setSnackbarTimestamp(new Date().toISOString());
      setTimeout(() => {
        history("/users");
      }, 2000);
    } catch (error) {
      setErrorSB(true);
      setSnackbarText("Error deleting user");
      setSnackbarTimestamp(new Date().toISOString());
      console.error("Error deleting user:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const cancelDeleteUser = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">User Details</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "650px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Grid container spacing={3}>
                    {/* Other user details inputs */}
                    <Grid item sx={12} >
                    <>
                        <MDAvatar
                          src={`http://localhost:8000${user?.avatar}`}
                          alt="user-image"
                          size="xxl"
                          shadow="sm"
                        />
                      </>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">username</Typography>
                      <MDInput value={user?.username} type="text" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">First name</Typography>
                      <MDInput value={user?.first_name} type="text" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">Last name</Typography>
                      <MDInput value={user?.last_name} type="text" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Email</Typography>
                      <MDInput value={user?.email} type="text" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Bio</Typography>
                      <MDInput value={user?.description} type="text" multiline rows={5} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Role</Typography>
                      <Autocomplete
                        options={roles}
                        value={selectedRole}
                        onChange={(event, newValue) => {
                          setSelectedRole(newValue);
                        }}
                        renderInput={(params) => <MDInput {...params} fullWidth disabled />}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="h6">Actions</Typography>
                      <Grid container spacing={3}>
                        {/* <Grid item xs={6}>
                          <MDButton variant="gradient" color="info" onClick={handleUpdateUser}>
                            Update User
                          </MDButton>
                        </Grid> */}
                        <Grid item xs={6}>
                          <MDButton variant="gradient" color="error" onClick={handleDeleteUser}>
                            Delete User
                          </MDButton>
                          <Dialog open={deleteDialogOpen} onClose={cancelDeleteUser}>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogContent>
                              <Typography variant="body1">
                                Are you sure you want to delete this account?
                              </Typography>
                            </DialogContent>
                            <DialogActions>
                              <MDButton onClick={cancelDeleteUser} variant="gradient" color="info">
                                Cancel
                              </MDButton>
                              <MDButton
                                onClick={confirmDeleteUser}
                                variant="gradient"
                                color="error"
                              >
                                Delete
                              </MDButton>
                            </DialogActions>
                          </Dialog>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <MDSnackbar
        color={successSB ? "success" : "error"}
        icon={successSB ? "check" : "error"}
        title="Message"
        content={snackbarText}
        dateTime={snackbarTimestamp}
        open={successSB || errorSB}
        onClose={() => {
          setSuccessSB(false);
          setErrorSB(false);
        }}
        close={() => {
          setSuccessSB(false);
          setErrorSB(false);
        }}
        bgWhite
      />
      <Footer />
    </DashboardLayout>
  );
}

export default UserData;
