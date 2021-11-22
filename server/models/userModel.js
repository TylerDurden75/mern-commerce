const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, "A user must have more or equal than 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["subscriber", "admin"],
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    //   wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
