import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
  const [orders, serOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    showUserOrders();
  }, []);

  const showUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      // setOrders(res.data);
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <UserNav />
        </div>
        <div className="col">user history page</div>
      </div>
    </div>
  );
};

export default History;
