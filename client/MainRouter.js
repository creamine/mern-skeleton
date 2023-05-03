// The MainRouter.js code will help render our custom React components with respect to the routes or locations in the application.
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Menu from "./core/Menu";

//
const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default MainRouter;
