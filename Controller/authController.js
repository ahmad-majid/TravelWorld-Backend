import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({ sucess: true, messsage: "Successfully Created" });
  } catch (err) {
    res.status(500).json({ sucess: false, messsage: "Failed to Created" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const loginUser = await User.findOne({ email });
    console.log(`🚀 ~ login ~ user:`, loginUser);
    console.log(">>>", loginUser, req.body.password);

    //if user not exist
    if (!loginUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    //if user exist then check password and compare password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    //if password is incorect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "INCORRECT EMAIL OR PASSWORD" });
    }
    const { password, role, ...rest } = loginUser._doc;
    //create jwt token
    const token = jwt.sign(
      { id: loginUser._id, role: loginUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token in the browser cookie and send response the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({ token, message: "successful login", data: { ...rest } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};
