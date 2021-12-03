const express = require("express");

const router = express.Router();

/**Middlewares */
const { authCheck } = require("../middlewares/auth");

/**Controllers */
const { userCart } = require("../controllers/user");

router.post("/cart", authCheck, userCart);

module.exports = router;
