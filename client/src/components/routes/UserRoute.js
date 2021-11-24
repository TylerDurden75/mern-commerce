import React from "react";
import { Routes } from "react-router";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
import UserNav from "../nav/UserNav";

import History from "../../pages/user/History";
import Password from "../../pages/user/Password";
import Wishlist from "../../pages/user/Wishlist";

const UserRoute = ({ children, ...rest }) => {
  // let location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Routes>
      <Route path="dashboard" element={<History />} />
      <Route path="password" element={<Password />} />
      <Route path="wishlist" element={<Wishlist />} />
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
