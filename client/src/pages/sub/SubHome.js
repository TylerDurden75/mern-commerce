import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router";

const SubHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      //   console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length >= 2 ? (
                <span>
                  {products.length} Products in "{sub.name}" category
                </span>
              ) : (
                <span>
                  {products.length} Product in "{sub.name}" category
                </span>
              )}
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-md-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
