import React, { useEffect, useState } from "react";
import { Routes } from "react-router";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../../functions/auth";
import AdminDashboard from "../../pages/admin/AdminDashboard";

const AdminRoute = ({ children, ...rest }) => {
  // let location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current Admin Res", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("Admin route error", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Routes>
      <Route {...rest} render={() => children}>
        <Route path="dashboard/*" element={<AdminDashboard />} />
      </Route>
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};
export default AdminRoute;
