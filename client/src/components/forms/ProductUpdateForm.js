import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
}) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          className="form-control"
          style={{ cursor: "pointer" }}
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
          style={{ cursor: "pointer" }}
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
          min="0"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          onChange={handleChange}
          name="shipping"
          className="form-control"
          style={{ cursor: "pointer" }}
        >
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
          min="0"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          onChange={handleChange}
          name="color"
          className="form-control"
          style={{ cursor: "pointer" }}
        >
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
          value={brand}
          onChange={handleChange}
          name="brand"
          className="form-control"
          style={{ cursor: "pointer" }}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
