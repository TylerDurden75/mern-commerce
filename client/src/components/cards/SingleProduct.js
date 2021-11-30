import React from "react";
import { Link } from "react-router-dom";
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";

import { Card, Tabs } from "antd";
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
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXXX XXX XXX XXX to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-secondary p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : "No rating yet"}

        <Card
          actions={[
            <React.Fragment>
              <ShoppingCartOutlined className="text-info" /> <br />
              Add to cart
            </React.Fragment>,
            <Link to="/">
              <HeartOutlined className="text-danger" /> <br />
              Add To Whislist
            </Link>,
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
