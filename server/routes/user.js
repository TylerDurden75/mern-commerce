const express = require("express");

const router = express.Router();

/**Middlewares */
const { authCheck } = require("../middlewares/auth");

/**Controllers */
const {
  userCart,
  getUserCart,
  emptyUserCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  wishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyUserCart);
router.post("/user/address", authCheck, saveAddress);

//order
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

module.exports = router;
