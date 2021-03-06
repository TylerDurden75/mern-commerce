import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  setValues,
  values,
  categories,
  subOptions,
  arrayOfSubs,
  selectedCategory,
  setArrayOfSubIds,
}) => {
  //Destructuring
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
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

      <div className="form-group">
        <label>Category</label>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
          name="category"
          className="form-control"
          style={{ cursor: "pointer" }}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Sub Categories</label>
        <Select
          onChange={(value) => setArrayOfSubIds(value)}
          value={arrayOfSubs}
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
