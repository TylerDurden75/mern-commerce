const express = require("express");

const router = express.Router();

/**Middlewares */
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, orderStatus } = require("../controllers/admin");

/**Routes */
router.get("/admin/orders", authCheck, adminCheck, orders);
router.get("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
