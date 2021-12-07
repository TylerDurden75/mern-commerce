/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import _ from "lodash";
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";
import { addToWishlist } from "../../functions/user";

import { toast } from "react-toastify";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../img/default-img.jpg";

import StarRatings from "react-star-ratings";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;

/**Children component of Product Page */
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCard = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      // console.log("Added to wishlist", res.data);
      toast.success("Added to Wishlist");
      navigate("/user/wishlist");
    });
  };

  return (
    <React.Fragment>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt="laptop" />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={laptop} alt="" className=" card-image mb-3" />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXXX XXX XXX XXX to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-secondary p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCard} href={handleAddToCard}>
                <ShoppingCartOutlined className="text-primary" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist} href={handleAddToWishlist}>
              <HeartOutlined className="text-danger" /> <br />
              Add To Whislist
            </a>,
            <RatingModal>
              <StarRatings
                name={_id}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="#f1a545"
                starHoverColor="#f1a545"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
