import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { getAuth, signOut } from "@firebase/auth";
// import "firebase/compat/auth";

import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  let navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<FormOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<UserOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/dashboard">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
