import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      console.log(JSON.stringify(c.data, null, 4));
      setCategory(c.data);
    });
  }, []);

  return <p>{slug}</p>;
};

export default CategoryHome;
