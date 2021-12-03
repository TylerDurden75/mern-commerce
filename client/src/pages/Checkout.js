import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("User cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address successfuly saved.");
      }
    });
  };

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
    <div className="row mt-2 pl-2">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
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
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
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
