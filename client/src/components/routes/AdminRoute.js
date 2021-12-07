import React, { useEffect, useState } from "react";
import { Routes } from "react-router";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../../functions/auth";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import CategoryCreate from "../../pages/admin/category/CategoryCreate";
import CategoryUpdate from "./../../pages/admin/category/CategoryUpdate";
import SubCreate from "../../pages/admin/sub/SubCreate";
import SubUpdate from "../../pages/admin/sub/SubUpdate";
import ProductCreate from "../../pages/admin/product/ProductCreate";
import AllProducts from "../../pages/admin/product/AllProducts";
import ProductUpdate from "../../pages/admin/product/ProductUpdate";
import CreateCouponPage from "../../pages/admin/coupon/CreateCouponPage";

const AdminRoute = ({ children, ...rest }) => {
  // let location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log("Current Admin Res", res);
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
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="category" element={<CategoryCreate />} />
      <Route path="category/:slug" element={<CategoryUpdate />} />
      <Route path="sub" element={<SubCreate />} />
      <Route path="sub/:slug" element={<SubUpdate />} />
      <Route path="product" element={<ProductCreate />} />
      <Route path="products" element={<AllProducts />} />
      <Route path="product/:slug" element={<ProductUpdate />} />
      <Route path="coupon" element={<CreateCouponPage />} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};
export default AdminRoute;
