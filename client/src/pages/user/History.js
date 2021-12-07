import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    showUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined className="text-success" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownLoadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownLoadLink(order)}</div>
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
