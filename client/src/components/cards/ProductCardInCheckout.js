import React from "react";

const ProductCardInCheckout = ({ product }) => {
  return (
    <tbody>
      <tr>
        <td>Image</td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>{product.color}</td>
        <td>{product.count}</td>
        <td>shipping Icon</td>
        <td>delete icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
