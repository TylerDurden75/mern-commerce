import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    let cancel = false;
    getProducts("sold", "desc", page).then((res) => {
      if (cancel) return;
      setProducts(res.data);
      setLoading(false);
    });

    return () => {
      cancel = true;
    };
  }, [page]);

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
            defaultCurrent={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default BestSellers;
