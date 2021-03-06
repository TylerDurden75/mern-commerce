import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let cancel = false;
    getCategories().then((c) => {
      if (cancel) return;
      setCategories(c.data);
      setLoading(false);
    });

    return () => {
      cancel = true;
    };
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outline-secondary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/category/${c.slug}`} className="text-secondary">
          {c.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
