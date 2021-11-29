import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";

const Product = () => {
  const [product, setProduct] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    showSingleProduct();
  }, [slug]);

  const showSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div>Related Product</div>
      </div>
    </div>
  );
};

export default Product;
