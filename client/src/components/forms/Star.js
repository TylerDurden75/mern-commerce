import React from "react";
import StarRatings from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <React.Fragment>
    <StarRatings
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="#f1a545"
      starEmptyColor="#f1a545"
    />
    <br />
  </React.Fragment>
);

export default Star;
