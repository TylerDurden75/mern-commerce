import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  /**Wrong method => memory leak */
  // useEffect(() => {
  //   showAllProducts();
  // }, [page]);

  /**GOOD METHOD clean up on useEffect */
  useEffect(() => {
    setLoading(true);
    let cancel = false;
    getProducts("createdAt", "desc", page).then((res) => {
      if (cancel) return;
      setProducts(res.data);
      setLoading(false);
    });

    return () => {
      cancel = true;
    };
  }, [page]);

  /**Wrong method => memory leak */
  // useEffect(() => {
  //   getProductsCount().then((res) => setProductsCount(res.data));
  // }, []);

  /**GOOD METHOD clean up on useEffect */
  useEffect(() => {
    let cancel = false;
    getProductsCount().then((res) => {
      if (cancel) return;
      setProductsCount(res.data);
    });

    return () => {
      cancel = true;
    };
  }, []);

  // const showAllProducts = () => {
  //   setLoading(true);
  //   getProducts("createdAt", "desc", page).then((res) => {
  //     setProducts(res.data);
  //     setLoading(false);
  //   });
  // };

  return (
    <React.Fragment>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-2 p-3">
          <Pagination
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
            defaultCurrent={page}
          />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NewArrivals;
