import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
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
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubIds] = useState([]);

  //Redux
  const { user } = useSelector((state) => ({ ...state }));
  let { slug } = useParams();

  useEffect(() => {
    showProduct();
    showCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); //on first load show default subs
      });
      // prepare sub[id] => antd design select
      let arr = [];
      p.data.subs.map((s) => arr.push(s._id));
      console.log("ARR", arr);
      setArrayOfSubIds((prev) => arr); //require for antd design select to word
    });
  };

  const showCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, "----", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      //   console.log("Sub Options click", res);
      setSubOptions(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            values={values}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubIds={setArrayOfSubIds}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
