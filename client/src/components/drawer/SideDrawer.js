import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import laptop from "../../img/default-img.jpg";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100px",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <React.Fragment>
                <img src={p.images[0].url} style={imageStyle} alt="item-pic" />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img src={laptop} style={imageStyle} alt="default-pic" />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
