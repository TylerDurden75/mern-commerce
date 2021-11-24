import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";

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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  //Destructuring
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product create</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                onChange={handleChange}
                value={title}
                type="text"
                name="title"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                onChange={handleChange}
                value={description}
                type="text"
                name="description"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                onChange={handleChange}
                value={price}
                type="number"
                name="price"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                onChange={handleChange}
                name="shipping"
                className="form-control"
              >
                <option>Please Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                onChange={handleChange}
                value={quantity}
                type="number"
                name="quantity"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <select
                onChange={handleChange}
                name="color"
                className="form-control"
              >
                <option>Please Select</option>
                {colors.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <select
                onChange={handleChange}
                name="brand"
                className="form-control"
              >
                <option>Please Select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
