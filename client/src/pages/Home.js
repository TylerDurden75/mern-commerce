import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-dark h1 font-weight-bold text-white text-center">
        <Jumbotron
          text={["Lastest Products", "New Arrivals", "Best Sellers"]}
        />
      </div>

      <h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4">
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4">
        Best Sellers
      </h4>
      <BestSellers />

      <br />
      <br />
    </>
  );
};

export default Home;
