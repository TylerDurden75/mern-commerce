import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const { slug } = useParams();

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    showSingleProduct();
  }, [slug]);

  const showSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log(res.data);
      showSingleProduct(); /**If I want user to see updated in real time */
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
