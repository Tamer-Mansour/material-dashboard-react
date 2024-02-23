/**
 * =========================================================
 * Material Dashboard 2 React - v2.2.0
 * =========================================================
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 * Coded by www.creative-tim.com
 * =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ProtectedRoute from "examples/ProtectedRoute";
import ChapterList from "layouts/chapters/ChapterList";
import AddChapter from "layouts/chapters/AddChapter";
import EditChapter from "layouts/chapters/EditChapter";
import CreateCodeChallenges from "layouts/challenge/CreateCodeChallenges";
import EditCodeChallenges from "layouts/challenge/EditCodeChallenges";
// import AdminUsers from "layouts/users/AdminUsers";
import Users from "layouts/users";
import UserData from "layouts/users/UserData";
import IDE from "layouts/codeEditor";
import EditProfile from "layouts/profile/EditProfile";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // console.log("isLoggedIn " + isLoggedIn);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  // TODO: synchronize login with local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.type !== "auth") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>{route.component}</ProtectedRoute>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Admin Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="authentication/sign-in" element={<SignIn />} />
        <Route path="authentication/sign-up" element={<SignUp />} />

        {getRoutes(routes)}

        <Route path="profile" element={<Profile />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          // exact
          path="/chapters"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <ChapterList />
            </ProtectedRoute>
          }
          key="tables"
        />
        <Route
          exact
          path="chapter/:id/edit"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <EditChapter />
            </ProtectedRoute>
          }
          key="edit chapter"
        />
        <Route
          exact
          path="chapters/add"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <AddChapter />
            </ProtectedRoute>
          }
          key="add chapters"
        />
        <Route
          exact
          path="ide"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <IDE />
            </ProtectedRoute>
          }
          key="ide"
        />
        <Route
          exact
          path="challenge/create"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <CreateCodeChallenges />
            </ProtectedRoute>
          }
          key="codeChalleges"
        />
        <Route
          exact
          path="/challenge/:id/edit"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <EditCodeChallenges />
            </ProtectedRoute>
          }
          key="edit code challenges"
        />
        <Route
          exact
          path="/users"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <Users />
            </ProtectedRoute>
          }
          key="users"
        />
        <Route
          exact
          path="/users/:id/edit-user"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <UserData />
            </ProtectedRoute>
          }
          key="edit-user"
        />
        <Route
          exact
          path="/profile/edit"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <EditProfile />
            </ProtectedRoute>
          }
          key="edit-profile"
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
