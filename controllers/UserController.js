const Role = require("../database/models/RoleModel");
const User = require("../database/models/UserModel");
const bcrypt = require("bcrypt");
const { getEndpointError, getEndpointSuccess } = require("../utils");
const { createToken } = require("../routing/jwt_token");
const { sendOtp } = require("../helpers/sendVerifyOtp");
const validator = require("validator");

// Display list of all users.
exports.user_list = async (req, res, next) => {
  try {
    const users = await User.find().populate("role");
    return res.send(getEndpointSuccess(users));
  } catch (error) {
    console.log(error);
    return res.send(getEndpointError("Error getting users"));
  }
};

// Display list of all roles.
exports.role_list = async (req, res, next) => {
  try {
    const roles = await Role.find();
    return res.send(getEndpointSuccess(roles));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error getting roles"));
  }
};

// Display detail page for a specific user.
exports.user_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = User.findOne({ _id: id }).populate("role");
    if (!user) {
      return res.status(400).send(getEndpointError("No user Found"));
    }
    return res.json(getEndpointSuccess(user));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Something went wrong"));
  }
};

// Handle user create on POST.
exports.user_create_post = async (req, res, next) => {
  let role;
  let user;
  try {
    const data = req.body;
    console.log(data);
    if (!validator.isEmail(data.email)) {
      return res.status(400).send(getEndpointError("Email is not correct"));
    }
    user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).send(getEndpointError("Email is already in use"));
    }
    user = await User.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
      role: await Role.create({ name: data.role }),
    });
    await sendOtp({
      to: data.email,
      subject: "Credentials for PMS",
      templateData: `Your email address is ${data.email} and password is "${data.password}".`,
    });
    res.status(200).send(getEndpointSuccess(user));
  } catch (error) {
    console.log(error);
    if (role) await Role.deleteOne({ _id: role.id });
    res.status(400).send(getEndpointError("User not created"));
  }
};

// Handle user delete on POST.
exports.user_delete_post = async (req, res, next) => {
  try {
    const cnic = req.params.cnic;
    const buyer = await User.deleteOne({ cnic: cnic });
    return res.send(getEndpointSuccess("User deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting user"));
  }
};

// Handle user update on POST.
exports.user_update_post = async (req, res, next) => {
  let user;
  try {
    const data = req.body;
    if (!validator.isEmail(data.email)) {
      return res.status(400).send(getEndpointError("Email is not correct"));
    }
    user = await User.findOne({ _id: data._id });

    if (user && user.id !== data.id) {
      return res
        .status(400)
        .send(getEndpointError("User with this email already exists"));
    }
    user = await User.findByIdAndUpdate(data.id, data, { new: true });
    res.status(200).send(getEndpointSuccess(user));
  } catch (error) {
    console.log(error);
    res.status(400).send(getEndpointError("User not created"));
  }
};

exports.user_login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email }).populate("role");
    const authenticated = await bcrypt.compare(data.password, user.password);
    if (!authenticated) {
      return res.status(400).send(getEndpointError("Password is not correct"));
    }
    const token = createToken(user);
    return res.json(getEndpointSuccess({ token, user }));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("User Not Logged In"));
  }
};
