const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ? cookie token function

exports.signup = async (request, response) => {
  try {
    const { username, email, password } = request.body;
    console.log(request.body);

    const user = await User.findOne({ email });
    if (user) {
      return response.json({ error: "user already exits" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newuser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newuser.save();
    response.json({
      message: "resgistration done",
      sucess: true,
      savedUser,
    });
  } catch (error) {
    response.json({ message: error.message }, { status: 400 });
  }
};

// ! signin controller code

exports.signin = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(request.body);

    const user = await User.findOne({ email });
    if (!user) {
      return response.json({ message: "user doesnot exist" }, { status: 400 });
    }

    //todo: check password is correct or not

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return response.status(400).json({ message: "invalid password" });
    }

    //todo create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, "secreteCode", {
      expiresIn: 60 * 60 * 24,
    });
    console.log(token);
    return response
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "logged in sucessfully" });
  } catch (error) {
    response.json({ message: error.message }, { status: 400 });
  }
};

exports.getAllData = async (request, response) => {
  const token = request.cookies.access_token;
  console.log(token);
};

exports.logout = async (request, response) => {
  return response
    .clearCookie("access_token")
    .status(200)
    .json({ message: "sucessfully logout" });
};
