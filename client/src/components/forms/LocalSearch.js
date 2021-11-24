import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      onChange={handleSearchChange}
      value={keyword}
      type="search"
      placeholder="Filter"
      className="form-control mb-4"
    />
  );
};

export default LocalSearch;
