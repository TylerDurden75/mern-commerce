import React from "react";

const ProductCreateForm = ({ handleSubmit, handleChange, values }) => {
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
          min="0"
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
          min="0"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select onChange={handleChange} name="color" className="form-control">
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
        <select onChange={handleChange} name="brand" className="form-control">
          <option>Please Select</option>
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
          name="category"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;