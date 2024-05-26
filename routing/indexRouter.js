const express = require("express");
const indexRouter = express.Router();
const userController = require("../controllers/UserController");
const passwordController = require("../controllers/passwordController");
const blockchainController = require("../controllers/blockchainController");
const districtController = require("../controllers/districtController");
const provinceController = require("../controllers/provinceController");
const buyerController = require("../controllers/buyerController");
const propertyController = require("../controllers/propertyController");
const societyController = require("../controllers/societyController");
const phaseController = require("../controllers/phaseController");
const plotController = require("../controllers/plotController");

const { Load_database } = require("../script");
indexRouter.get("/", (req, res) => {
  res.send("Hello from express app");
});

// indexRouter.get("/database", async (req, res) => {
//   Load_database();
//   res.send("Hello from express app");
// });

//  User routes
indexRouter.post("/user/create", userController.user_create_post);
indexRouter.post("/login", userController.user_login);

// Password Reset Routes
indexRouter.post("/reset-password", passwordController.sendOtpCode);
indexRouter.post(
  "/reset-password/verify-otp",
  passwordController.verifyOtpCode
);
indexRouter.post("/change-password", passwordController.changePassword);
// indexRouter.get("/get-property", blockchainController.getProperty);
// indexRouter.post("/set-property", blockchainController.setProperty);
// District routes
indexRouter.get("/districts", districtController.district_list);

// Province routes
indexRouter.get("/provinces", provinceController.province_list);

// Society routes
indexRouter.get("/societies", societyController.society_list);

// Phase routes
indexRouter.get("/phases", phaseController.phase_list);

// Buyer routes
indexRouter.get("/buyers", buyerController.buyer_list);

// Property routes
indexRouter.get("/properties", propertyController.property_list);

// Dealer routes
indexRouter.get("/dealers", userController.user_list);

// Property
indexRouter.get("/property-list", plotController.plot_list_populated);

indexRouter.get("/verification/:plot_no", propertyController.verification);

indexRouter.get("/get-block/:block_id", plotController.get_block);

module.exports = indexRouter;
