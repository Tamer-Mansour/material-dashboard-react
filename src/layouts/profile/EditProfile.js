import React, { useEffect, useState } from "react";
import { Card, CircularProgress, Grid, TextField } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded;
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      }

      return null;
    };

    const fetchData = async () => {
      const decodedToken = decodeToken();
      if (decodedToken && decodedToken.user_id) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/auth/users/${decodedToken.user_id}/`
          );
          const userData = response.data;
          setUserData(userData);
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setUserData({ ...userData, [field]: file });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Append non-file fields to the FormData
      Object.entries(userData).forEach(([key, value]) => {
        if (key !== "avatar") {
          formData.append(key, value);
        }
      });

      // Check if a new avatar file is selected before appending it to FormData
      if (userData.avatar && typeof userData.avatar !== "string") {
        formData.append("avatar", userData.avatar);
      }

      await axios.put(`http://localhost:8000/api/auth/user/update/${userData.id}/`, formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading || !dataFetched) {
    return <CircularProgress />;
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h2">edit profile page</MDTypography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ minHeight: "600px", maxHeight: "600px", overflowY: "auto", padding: 2 }}>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="Username"
                      type="text"
                      fullWidth
                      value={userData.username}
                      onChange={(e) => handleInputChange(e, "username")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="first_name"
                      label="First Name"
                      type="text"
                      fullWidth
                      value={userData.first_name}
                      onChange={(e) => handleInputChange(e, "first_name")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="last_name"
                      label="Last Name"
                      type="text"
                      fullWidth
                      value={userData.last_name}
                      onChange={(e) => handleInputChange(e, "last_name")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      value={userData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="date_of_birth"
                      label="Date of Birth"
                      type="date"
                      fullWidth
                      value={userData.date_of_birth}
                      onChange={(e) => handleInputChange(e, "date_of_birth")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="description"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      value={userData.description}
                      onChange={(e) => handleInputChange(e, "description")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <img
                      src={`http://localhost:8000${userData?.avatar}`}
                      alt="Avatar"
                      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="avatar"
                      label="Avatar"
                      type="file"
                      fullWidth
                      onChange={(e) => handleFileChange(e, "avatar")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="location"
                      label="Location"
                      type="text"
                      fullWidth
                      value={userData.location}
                      onChange={(e) => handleInputChange(e, "location")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="social_media_url"
                      label="Social Media URL"
                      type="text"
                      fullWidth
                      value={userData.social_media_url}
                      onChange={(e) => handleInputChange(e, "social_media_url")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="mobile"
                      label="Mobile"
                      type="text"
                      fullWidth
                      value={userData.mobile}
                      onChange={(e) => handleInputChange(e, "mobile")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                      Submit
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
};

export default EditProfile;
