import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer, Button } from "antd";
import laptop from "../../img/default-img.jpg";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>;
};

export default SideDrawer;
