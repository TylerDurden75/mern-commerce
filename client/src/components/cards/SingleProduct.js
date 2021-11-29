import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

  return (
    <>
      <div className="col-md-7">image carrousel</div>

      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-primary" /> <br />
              Add to cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add To Whislist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
          <p>
            price/category/subs/shipping/color/brand/quantity available/sold
          </p>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
