import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import UpdateProductForm from "../../../components/forms/UpdateProductForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  brands: ["Apple", "Microsoft", "Dell", "HP", "Samsung", "Lenovo", "ASUS"],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  //state
  const [values, setValues] = useState(initialState);

  //Redux
  const { user } = useSelector((state) => ({ ...state }));
  let { slug } = useParams();

  useEffect(() => {
    showProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showProduct = () => {
    getProduct(slug)
      .then((p) => {
        // console.log("single product", p);
        setValues({ ...values, ...p.data });
      })
      .catch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, "----", e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          <UpdateProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
