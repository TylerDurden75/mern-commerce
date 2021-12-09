/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  BgColorsOutlined,
  DollarOutlined,
  DownSquareOutlined,
  SendOutlined,
  StarOutlined,
  TagOutlined,
  TagsOutlined,
} from "@ant-design/icons";

import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Microsoft",
    "Dell",
    "HP",
    "Samsung",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    showAllProducts();
    let cancel = false;
    getCategories().then((res) => {
      if (cancel) {
        setCategories(res.data);
      }
    });
    let unsubscribe = false;
    getSubs().then((res) => {
      if (unsubscribe) {
        setSubs(res.data);
      }
    });
    return () => {
      cancel = true;
      unsubscribe = true;
    };
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  /**1. Load products by default on page load */
  const showAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  /**2. Load products based in search input */
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        showAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  /**3. Load products based on price range */
  useEffect(() => {
    fetchProducts({ price });
  }, [ok, price]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    //reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  /**4. Load products based on category */
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id} className="bg-white">
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          checked={categoryIds.includes(c._id)}
          name="category"
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    let intoTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundIntoTheState = intoTheState.indexOf(justChecked);

    if (foundIntoTheState === -1) {
      intoTheState.push(justChecked);
    } else {
      intoTheState.splice(foundIntoTheState, 1);
    }

    setCategoryIds(intoTheState);
    fetchProducts({ category: intoTheState });
  };

  /**5. Load products based on star ratings */
  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setStar(num);
    fetchProducts({ stars: num });
  };

  /**6. Load products based on sub cat */
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    setSub(sub);
    fetchProducts({ sub: sub });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2 bg-white">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  /**7. Load products based on brands */
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  /**8. Load products based on colors */
  const showColors = () =>
    colors.map((col) => (
      <Radio
        key={col}
        value={col}
        name={col}
        checked={col === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {col}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  /**9. Load products based on shipping y/n*/
  const showShipping = () => (
    <React.Fragment>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </React.Fragment>
  );

  const handleShippingChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  onChange={handleSlider}
                  value={price}
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  max="4999"
                />
              </div>
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <TagsOutlined />
                  Sub Categories
                </span>
              }
            >
              <div
                style={{ marginTop: "-10px" }}
                className="pl-4 pr-4 bg-white"
              >
                {showSubs()}
              </div>
            </SubMenu>

            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <TagOutlined />
                  Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5 bg-white">
                {showBrands()}
              </div>
            </SubMenu>

            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined />
                  Color
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5 bg-white">
                {showColors()}
              </div>
            </SubMenu>

            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <SendOutlined />
                  Shipping
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5 bg-white">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading....</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
