const User = require("../models/userModel");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    console.log(user);
    res.json(user);
  } else {
    const newUser = await User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log(newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.find({ email });
};
