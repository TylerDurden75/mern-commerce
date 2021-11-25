import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";

const ProductUpdate = () => {
  //Redux
  const { user } = useSelector((state) => ({ ...state }));
  let { slug } = useParams();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          {JSON.stringify(slug)}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
