/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import axios from "axios";
import MDButton from "components/MDButton";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDAvatar from "components/MDAvatar";

function Projects() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchUsersByRole = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/get_users_by_role/instructor/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersByRole();
  }, []);

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit-user`);
  };

  return (
    <Card sx={{ minHeight: "550px", maxHeight: "650px", overflowY: "auto", padding: 2 }}>
      <MDBox pt={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography> Instructors </MDTypography>
            <DataTable
              table={{
                columns: [
                  { Header: "Avatar", accessor: "avatar" },
                  { Header: "Username", accessor: "username" },
                  { Header: "First Name", accessor: "first_name" },
                  { Header: "Last Name", accessor: "last_name" },
                  { Header: "Actions", accessor: "actions" },
                ],
                rows: users.map((user) => ({
                  avatar: (
                    <>
                      <MDAvatar
                        src={`http://localhost:8000${user?.avatar}`}
                        alt="user-image"
                        size="sm"
                        shadow="sm"
                      />
                    </>
                  ),
                  username: user.username,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  actions: (
                    <MDButton
                      variant="caption"
                      color="text"
                      onClick={() => handleEditUser(user.id)}
                    >
                      View
                    </MDButton>
                  ),
                })),
              }}
              canSearch={true}
              pagination={{ variant: "contained", color: "info" }}
              entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20, 25] }}
              showTotalEntries={true}
              isSorted={true}
              noEndBorder={false}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Projects;
