import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable"; // Import the DataTable component
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import MDAvatar from "components/MDAvatar";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchUsersByRole = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/get_users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersByRole();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleAddUser = () => {
    // Navigate to the add user page
    navigate("/create-user");
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Send a request to delete the user
      await axios.delete(`http://localhost:8000/api/auth/user/delete/${userId}/`);
      // Refresh the user list
      const response = await axios.get("http://localhost:8000/api/auth/get_users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDTypography variant="h2">Users Management</MDTypography>
          </Grid>
          <Grid item sx={2}>
            <MDButton variant="gradient" color="info" onClick={handleAddUser}>
              Register New User
            </MDButton>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ minHeight: "640px", overflowY: "auto", padding: 2 }}>
              <DataTable
                table={{
                  columns: [
                    { Header: "Avatar", accessor: "avatar" },
                    { Header: "Username", accessor: "username" },
                    { Header: "First Name", accessor: "first_name" },
                    { Header: "Last Name", accessor: "last_name" },
                    { Header: "Email", accessor: "email" },
                    { Header: "Role", accessor: "role" },
                    { Header: "Created At", accessor: "created_at" },
                    { Header: "Updated At", accessor: "updated_at" },
                    { Header: "Actions", accessor: "actions" },
                  ],
                  rows: users.map((user) => ({
                    avatar: (
                      <>
                        <MDAvatar
                          src={`http://localhost:8000${user?.avatar}`}
                          alt="user-image"
                          size="md"
                          shadow="sm"
                        />
                      </>
                    ),
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    created_at: formatDate(user.created_at),
                    updated_at: formatDate(user.updated_at),
                    actions: (
                      <>
                        <MDButton
                          variant="caption"
                          color="text"
                          href={`/users/${user.id}/edit-user`}
                        >
                          View
                        </MDButton>
                      </>
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
