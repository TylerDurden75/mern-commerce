import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";

const ProductCreate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <AdminNav />
        </div>
        <div className="col-md-10">Product create form</div>
      </div>
    </div>
  );
};

export default ProductCreate;
