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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useNavigate } from "react-router-dom";

function OrdersOverview() {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Shortcuts
        </MDTypography>
        <MDBox mt={0} mb={2}></MDBox>
      </MDBox>
      <MDBox p={2}>
        <div
          onClick={() => {
            navigate("/profile");
          }}
        >
          <TimelineItem
            color="success"
            icon="person"
            title="your profile"
            dateTime="22 DEC 7:20 PM"
          />
        </div>
        <div
          onClick={() => {
            navigate("/chapters/add");
          }}
        >
          <TimelineItem
            color="error"
            icon="inventory_2"
            title="New Chapter"
            dateTime="21 DEC 11 PM"
          />
        </div>
        <div
          onClick={() => {
            navigate("/challenge/create");
          }}
        >
          <TimelineItem
            color="info"
            icon="inventory_2"
            title="New code challenge"
            dateTime="21 DEC 9:34 PM"
          />
        </div>
        <div
          onClick={() => {
            navigate("/create-user");
          }}
        >
          <TimelineItem
            color="warning"
            icon="person_add"
            title="Register user"
            dateTime="20 DEC 2:20 AM"
          />
        </div>
        <div
          onClick={() => {
            navigate("/ide");
          }}
        >
          <TimelineItem
            color="info"
            icon="code"
            title="Code Editor"
            dateTime="18 DEC 4:54 AM"
            lastItem
          />
        </div>
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
