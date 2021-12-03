const User = require("../models/userModel");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    payment_method_types: ["card"],
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
