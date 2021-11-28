import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../img/default-img.jpg";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          alt=""
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-primary" />
          <br /> View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
        </>,
      ]}
    >
      {" "}
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
