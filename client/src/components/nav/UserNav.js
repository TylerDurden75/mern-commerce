import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserNav = () => {
  return (
    <>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/user/dashboard" className="nav-link">
              History
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/password" className="nav-link">
              Password
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/wishlist" className="nav-link">
              Whislist
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default UserNav;
