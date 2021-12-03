import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart } from "../functions/user";
import { toast } from "react-toastify";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("User cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {};

  const emptyCart = () => {
    //remove from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //remove from back-end
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setCartTotal(0);
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  return (
    <div className="row mt-2">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon ?</h4>
        <br />
        coupon input and apply button
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length} Products</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} = ${p.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>
          Cart Total : <b>${cartTotal}</b>
        </p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>
          <div className="col-md-6">
            <button
              onClick={emptyCart}
              className="btn btn-primary"
              disabled={!products.length}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
