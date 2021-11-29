import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    showSingleProduct();
  }, [slug]);

  const showSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return <>{JSON.stringify(product)}</>;
};

export default Product;
