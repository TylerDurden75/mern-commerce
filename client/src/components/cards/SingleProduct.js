import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";

import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../img/default-img.jpg";

import StarRatings from "react-star-ratings";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description, _id } = product;
  const [rating, setRating] = useState(0);

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
                rating={2}
                changeRating={(newRating, name) =>
                  console.log("newRating", newRating, "name", name)
                }
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
