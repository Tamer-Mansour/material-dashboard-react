import React, { useEffect, useState } from "react";
import { Autocomplete, Card, Grid, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import useRegisterUser from "custom_hooks/AuthQuery/useRegisterUser";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGenerateSuggestedUsername from "custom_hooks/AuthQuery/useGenerateSuggestedUsername";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const suggestedUsername = useGenerateSuggestedUsername(firstName, lastName);

  const { registerUser } = useRegisterUser({
    onRegisterSuccess: (userData) => {
      console.log("User registered successfully", userData);
      navigate("/users");
    },
  });

  const SugEmail = [`${firstName.toLowerCase()}.${lastName.toLowerCase()}@algolab.com`];
  const SugPassword = [`Algolab@2024`];
  const allRoles = ["admin", "student", "instructor"];

  const handleRegUser = () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      email: email,
      password: password,
      role: role,
    };

    registerUser(userData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Create user</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{ minHeight: "650px", maxHeight: "600px", overflowY: "auto", padding: 2 }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <MDTypography variant="h6">First Name</MDTypography>
                      <MDInput
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MDTypography variant="h6">Last Name</MDTypography>
                      <MDInput
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MDTypography variant="h6">Username</MDTypography>
                      <Autocomplete
                        id="username"
                        options={suggestedUsername}
                        value={userName}
                        onChange={(event, newValue) => {
                          setUserName(newValue);
                        }}
                        renderInput={(params) => <MDInput {...params} fullWidth />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="h6">Email</MDTypography>
                      {/* <Autocomplete
                        id="email"
                        options={SugEmail}
                        value={email}
                        freeSolo
                        onChange={(event, newValue) => {
                          setEmail(newValue);
                        }}
                        renderInput={(params) => <MDInput {...params} fullWidth />}
                      /> */}
                      <MDInput
                        type="text"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="h6">Password</MDTypography>
                      <Autocomplete
                        id="password"
                        options={SugPassword}
                        value={password}
                        onChange={(event, newValue) => {
                          setPassword(newValue);
                        }}
                        renderInput={(params) => <MDInput type="password" {...params} fullWidth />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDTypography variant="h6">Role</MDTypography>
                      <Autocomplete
                        id="role"
                        options={allRoles}
                        value={role}
                        onChange={(event, newValue) => {
                          setRole(newValue);
                        }}
                        renderInput={(params) => <MDInput {...params} fullWidth />}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="h6">Actions</Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <MDButton variant="gradient" color="info" onClick={handleRegUser}>
                            Register User
                          </MDButton>
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

      <Footer />
    </DashboardLayout>
  );
};

export default CreateUser;
