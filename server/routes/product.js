const express = require("express");

const router = express.Router();

//Middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controller
const { create } = require("../controllers/product");

//Routes
router.post("/product", authCheck, adminCheck, create);

module.exports = router;
