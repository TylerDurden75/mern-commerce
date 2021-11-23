import React from "react";
import { Routes } from "react-router";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
import History from "../../pages/user/History";

const UserRoute = ({ children, ...rest }) => {
  // let location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Routes>
      <Route
        path="history"
        {...rest}
        render={() => children}
        element={<History />}
      />
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
