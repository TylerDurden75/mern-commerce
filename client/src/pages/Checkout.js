import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";

import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, cash } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

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
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <React.Fragment>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </React.Fragment>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = ${p.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <React.Fragment>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </React.Fragment>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, cash, couponTrueOrFalse).then((res) => {
      console.log("User cash order", res);
      if (res.data.ok) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        dispatch({
          type: "CASH_ON_DELIVERY",
          payload: false,
        });
        emptyUserCart(user.token);
        // redirection
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="row mt-2 pl-2">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon ?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && (
          <p className="bg-danger text-center text-white p-2">
            🤷 &nbsp;&nbsp; {discountError} &nbsp;&nbsp; 🤷‍♂️
          </p>
        )}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length} Products</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>
          Cart Total : <b>${cartTotal}</b>
        </p>

        {totalAfterDiscount > 0 && (
          <p className="bg-primary text-center text-white p-2">
            ✨✨✨ &nbsp; Total Payable after discount : ${totalAfterDiscount}{" "}
            &nbsp; ✨✨✨
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {cash ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/payment")}
              >
                Place Order
              </button>
            )}
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
