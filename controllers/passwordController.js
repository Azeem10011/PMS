const User = require("../database/models/UserModel");
const Verification = require("../database/models/VerificationModel");
const { sendOtp } = require("../helpers/sendVerifyOtp");
const bcrypt = require("bcrypt");
const { getEndpointError, getEndpointSuccess } = require("../utils");

exports.sendOtpCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send(getEndpointError("No user found with this email"));
    }
    const code = Math.floor(Math.random() * 900000) + 100000;
    await sendOtp({
      to: email,
      subject: "OTP to reset password",
      templateData: `Your otp to reset password is ${code}.\nThis code will expire in one hour`,
    });
    const verification = await Verification.create({
      user: user.id,
      passwordResetToken: code,
      passwordResetTokenExpiresAt: Date.now() + process.env.PASS_RESET_TIME,
    });
    await User.updateOne({ id: user.id }).set({
      verification: verification.id,
    });

    return res.json(getEndpointSuccess({ otp: code, user }));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Something went wrong"));
  }
};

exports.verifyOtpCode = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email }).populate("verification");
    if (
      !user ||
      !user.verification ||
      user.verification.passwordResetToken !== code ||
      user.verification.passwordResetTokenExpiresAt < Date.now()
    ) {
      return res.status(400).send(getEndpointError("Invalid or Expired Otp"));
    }
    await Verification.updateOne({ id: user.verification.id }).set({
      tokenVerified: true,
    });
    res.send(getEndpointSuccess("OTP verified successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Something Went wrong"));
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("verification");
    if (!user || !user.verification || !user.verification.tokenVerified) {
      console.log("in the verifi");
      return res.status(400).send(getEndpointError("Otp is not verified"));
    }
    await Verification.deleteOne({ _id: user.verification.id });
    const updatedUser = await User.updateOne({ _id: user.id }).set({
      password: await bcrypt.hash(password, 10),
    });
    res.send(getEndpointSuccess(updatedUser));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Something Went wrong"));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send(getEndpointError("No user found"));
    }
    const updatedUser = await User.updateOne({
      password: await bcrypt.hash(password, 10),
    });
    res.send(getEndpointSuccess(updatedUser));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Something Went wrong"));
  }
};
