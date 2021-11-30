import { React } from "react";
import StarRating from "react-star-ratings";
import { productStar } from "./product";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((prev, nw) => prev + nw, 0);
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            rating={result}
            starRatedColor="#f1a545"
            starDimension="20px"
            starSpacing="2px"
            editing={false}
          />{" "}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
