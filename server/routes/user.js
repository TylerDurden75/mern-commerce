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
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyUserCart);
router.post("/user/address", authCheck, saveAddress);

module.exports = router;
