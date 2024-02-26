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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [users, setUsers] = useState([]);
  const [increaseThisWeek, setIncreaseThisWeek] = useState(false);
  const [lastWeekUsers, setLastWeekUsers] = useState([]);
  console.log("lastWeekUsers  "+ lastWeekUsers.created_at);

  const [challenges, setChallenges] = useState([]);
  const [increaseChallengesThisWeek, setIncreaseChallengesThisWeek] = useState(false);
  const [lastWeekChallenges, setLastWeekChallenges] = useState([]);

  useEffect(() => {
    // Fetch code challenges data from the API
    axios
      .get("http://localhost:8000/api/content/coding_challenges/")
      .then((response) => {
        setChallenges(response.data);

        // Calculate the challenges created in the last 7 days
        const now = new Date();
        const thisWeekChallenges = response.data.filter((challenge) => {
          const challengeCreatedAt = new Date(challenge.created_at);
          const daysDiff = Math.floor((now - challengeCreatedAt) / (1000 * 60 * 60 * 24));
          return daysDiff <= 7;
        });

        setIncreaseChallengesThisWeek(thisWeekChallenges.length > 0);

        // Calculate the challenges created in the last week
        const lastWeekStartDate = new Date();
        lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
        const lastWeekChallenges = response.data.filter((challenge) => {
          const challengeCreatedAt = new Date(challenge.created_at);
          return challengeCreatedAt >= lastWeekStartDate && challengeCreatedAt < now;
        });

        setLastWeekChallenges(lastWeekChallenges);
      })
      .catch((error) => {
        console.error("Error fetching code challenges:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch users data from the API
    axios
      .get("http://localhost:8000/api/auth/get_users/")
      .then((response) => {
        setUsers(response.data);

        // Calculate the users created in the last 7 days
        const now = new Date();
        const thisWeekUsers = response.data.filter((user) => {
          const userCreatedAt = new Date(user.created_at);
          const daysDiff = Math.floor((now - userCreatedAt) / (1000 * 60 * 60 * 24));
          return daysDiff <= 7;
        });

        setIncreaseThisWeek(thisWeekUsers.length > 0);

        // Calculate the users created in the last week
        const lastWeekStartDate = new Date();
        lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
        const lastWeekUsers = response.data.filter((user) => {
          
          const userCreatedAt = new Date(user.created_at);
          return userCreatedAt >= lastWeekStartDate && userCreatedAt < now;
        });

        setLastWeekUsers(lastWeekUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Calculate the percentage change
  const percentageChange = lastWeekUsers.length
    ? ((users.length - lastWeekUsers.length) / lastWeekUsers.length) * 100
    : 0;

  const percentageChangeChallenges = lastWeekChallenges.length
    ? ((challenges.length - lastWeekChallenges.length) / lastWeekChallenges.length) * 100
    : 0;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Total Users"
                count={users.length}
                percentage={{
                  color: increaseThisWeek ? "success" : "error",
                  amount: increaseThisWeek
                    ? `+${percentageChange.toFixed(2)}%`
                    : `-${percentageChange.toFixed(2)}%`,
                  label: increaseThisWeek ? "than last week" : "this week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="code"
                title="Code Challenges"
                count={challenges.length}
                // Customize the percentage as needed
                percentage={{
                  color: increaseChallengesThisWeek ? "info" : "error",
                  amount: increaseChallengesThisWeek
                    ? `+${percentageChangeChallenges.toFixed(2)}%`
                    : `-${percentageChangeChallenges.toFixed(2)}%`,
                  label: increaseChallengesThisWeek ? "than last week" : "this week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="primary"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
