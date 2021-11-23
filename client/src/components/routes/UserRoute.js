import React from "react";
import { Navigate, Routes, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  // let location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Routes>
      <Route {...rest} render={() => children} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};
export default UserRoute;

// if (!user) {
//   return <Navigate to="/register" state={{ from: location }} {...rest} />;
// }

// return children;
