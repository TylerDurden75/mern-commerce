const express = require("express");

const router = express.Router();

//Middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStart,
  listRelated,
  searchFilters,
} = require("../controllers/product");

/**ROUTES */
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
//ratings
router.put("/product/star/:productId", authCheck, productStart);
//related
router.get("/product/related/:productId", listRelated);
//search query
router.post("/search/filters", searchFilters);

module.exports = router;
