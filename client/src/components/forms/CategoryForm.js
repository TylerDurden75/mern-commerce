import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        className="form-control"
        minLength="2"
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

export default CategoryForm;
