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

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data

// Images

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function Overview() {
  // const [userIdFromToken, setUserIdFromToken] = useState();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log(decoded);
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
        // setUserIdFromToken(decodedToken.user_id);

        try {
          const response = await axios.get(
            `http://localhost:8000/api/auth/users/${decodedToken.user_id}/`
          );
          const userData = response.data;
          setUserData(userData);
          setDataFetched(true); // Set the state to true after successful data fetch
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

  if (loading || !dataFetched) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <CircularProgress />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox m={12}>
            <CircularProgress />
          </MDBox>
        </DashboardLayout>
      ) : (
        <>
          <MDBox mb={2} />
          <Header userData={userData}>
            <MDBox mt={5} mb={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
                  <ProfileInfoCard
                    title="Bio"
                    description={userData?.description}
                    info={{
                      fullName: userData?.first_name + " " + userData?.last_name,
                      mobile: userData?.mobile,
                      email: userData?.email,
                      location: userData?.location,
                    }}
                    social={[
                      {
                        link: userData?.social_media_url,
                        icon: <LinkedInIcon />,
                        color: "facebook",
                      },
                    ]}
                    action={{ route: "/profile/edit", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Header>
          <Footer />
        </>
      )}
    </DashboardLayout>
  );
}

export default Overview;
