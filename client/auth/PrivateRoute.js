// The code in this file will allow us to declare protected routes for the frontend to restrict view access based on user auth.
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        children
      ) : (
        <Navigate
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
