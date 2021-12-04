import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    showUserOrders();
  }, []);

  const showUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => <p>each order product</p>;

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>show payment info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF DOWLOAD</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <UserNav />
        </div>
        <div className="col pt-2 text-center">
          <h4>{orders.length > 0 ? "User purchase orders" : "No purchase"}</h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
