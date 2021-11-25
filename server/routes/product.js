const express = require("express");

const router = express.Router();

//Middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controller
const { create, listAll, remove } = require("../controllers/product");

//Routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
