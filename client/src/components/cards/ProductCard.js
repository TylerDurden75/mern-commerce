import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../img/default-img.jpg";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
  return (
    <React.Fragment>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
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
          <React.Fragment>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </React.Fragment>,
        ]}
      >
        {" "}
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </React.Fragment>
  );
};

export default ProductCard;
