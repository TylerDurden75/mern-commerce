const express = require("express");

const router = express.Router();

//Middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controller
const { create, listAll } = require("../controllers/product");

//Routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);

module.exports = router;
