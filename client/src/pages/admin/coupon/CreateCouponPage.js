import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";

import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

const CreateCouponPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Coupon</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
