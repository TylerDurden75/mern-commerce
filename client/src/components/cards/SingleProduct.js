import React from "react";
import { Link } from "react-router-dom";
import ProductListItems from "./ProductListItems";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../img/default-img.jpg";

const SingleProduct = ({ product }) => {
  const { title, images } = product;

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
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
