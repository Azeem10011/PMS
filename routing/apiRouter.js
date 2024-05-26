const express = require("express");
const apiRouter = express.Router();
const propertyController = require("../controllers/propertyController");
const buyerController = require("../controllers/buyerController");
const passwordController = require("../controllers/passwordController");
const userController = require("../controllers/UserController");
const plotController = require("../controllers/plotController");
const provinceController = require("../controllers/provinceController");
const districtController = require("../controllers/districtController");
const societyOwnerController = require("../controllers/societyOwnerController");
const societyController = require("../controllers/societyController");
const publicPlaceController = require("../controllers/publicPlaceController");
const taxController = require("../controllers/taxController");
const phaseController = require("../controllers/phaseController");
const { verifyJwt } = require("../middleware/authMiddleware");

apiRouter.get("/", (req, res) => {
  res.send("Hello from API");
});
// Routes henceforth are protected with jwt
apiRouter.use(verifyJwt);

// Get All Roles
apiRouter.get("/roles", userController.role_list);

// User Routes
apiRouter.get("/users", userController.user_list);
apiRouter.post("/user/update", userController.user_update_post);
apiRouter.delete("/user/delete/:id", userController.user_delete_post);
apiRouter.get("/user/detail/:id", userController.user_detail);
apiRouter.post("/user/reset/password", passwordController.resetPassword);

// Dealer Routes
apiRouter.get("/dealers", userController.user_list);
apiRouter.post("/dealer/create", userController.user_create_post);
apiRouter.post("/dealer/update", userController.user_update_post);
apiRouter.delete("/dealer/delete/:cnic", userController.user_delete_post);
apiRouter.get("/dealer/detail/:id", userController.user_detail);

// Buyer Routes
apiRouter.get("/buyers", buyerController.buyer_list);
apiRouter.post("/buyer/create", buyerController.buyer_create_post);
apiRouter.post("/buyer/update", buyerController.buyer_update_post);
apiRouter.delete("/buyer/delete/:cnic", buyerController.buyer_delete_post);
apiRouter.get("/buyer/detail/:id", buyerController.buyer_detail);

// Province Routes
apiRouter.get("/provinces", provinceController.province_list);
apiRouter.post("/province/create", provinceController.province_create_post);
apiRouter.post("/province/update", provinceController.province_update_post);
apiRouter.delete(
  "/province/delete/:id",
  provinceController.province_delete_post
);
apiRouter.get("/province/detail/:id", provinceController.province_detail);

// District Routes
apiRouter.get("/districts", districtController.district_list);
apiRouter.post("/district/create", districtController.district_create_post);
apiRouter.post("/district/update", districtController.district_update_post);
apiRouter.delete(
  "/district/delete/:id",
  districtController.district_delete_post
);
apiRouter.get("/district/detail/:id", districtController.district_detail);

// Property Routes
apiRouter.get("/properties", propertyController.property_list);
apiRouter.get(
  "/specific_properties/:phase_id/:property_type",
  propertyController.get_specific_property_list
);
apiRouter.post(
  "/property/create/house",
  propertyController.property_create_post
);
apiRouter.post("/property/sell", propertyController.property_sell_post);
apiRouter.post("/rent_property", propertyController.property_rent_post);
apiRouter.post(
  "/property/create/building",
  propertyController.property_create_building_post
);
apiRouter.post(
  "/property/update",
  propertyController.property_create_building_post
);
apiRouter.delete(
  "/property/delete/:id",
  propertyController.property_delete_post
);
apiRouter.get("/property/detail/:id", propertyController.property_detail);

// Plot Routes
apiRouter.get("/plots", plotController.plot_list);
apiRouter.post("/plot/create", plotController.plot_create_post);
apiRouter.post("/plot/update", plotController.plot_update_post);
apiRouter.delete("/plot/delete/:id", plotController.plot_delete_post);
apiRouter.get("/plot/detail/:id", plotController.plot_detail);

// Society Routes
apiRouter.get("/societies", societyController.society_list);
apiRouter.post("/society/create", societyController.society_create_post);
apiRouter.post("/society/update", societyController.society_update_post);
apiRouter.delete("/society/delete/:id", societyController.society_delete_post);
apiRouter.get("/society/detail/:id", societyController.society_detail);

// Tax Routes
apiRouter.get("/taxes", taxController.tax_list);
apiRouter.post("/tax/create", taxController.tax_create_post);
apiRouter.post("/tax/update", taxController.tax_update_post);
apiRouter.delete("/tax/delete/:id", taxController.tax_delete_post);
apiRouter.get("/tax/detail/:id", taxController.tax_detail);

// Phase Routes
apiRouter.get("/phases", phaseController.phase_list);
apiRouter.post("/phase/create", phaseController.phase_create_post);
apiRouter.post("/phase/update", phaseController.phase_update_post);
apiRouter.delete("/phase/delete/:id", phaseController.phase_delete_post);
apiRouter.get("/phase/detail/:id", phaseController.phase_detail);

// Public Place Routes
apiRouter.get("/publcPlaces", publicPlaceController.publicPlace_list);
apiRouter.post(
  "/publicPlace/create",
  publicPlaceController.publicPlace_create_post
);
apiRouter.post(
  "/publicPlace/update",
  publicPlaceController.publicPlace_update_post
);
apiRouter.delete(
  "/publicPlace/delete/:id",
  publicPlaceController.publicPlace_delete_post
);
apiRouter.get(
  "/publicPlace/detail/:id",
  publicPlaceController.publicPlace_detail
);

// Society Owner Routes
apiRouter.get("/societyOwners", societyOwnerController.societyOwner_list);
apiRouter.post(
  "/societyOwner/create",
  societyOwnerController.societyOwner_create_post
);
apiRouter.post(
  "/societyOwner/update",
  societyOwnerController.societyOwner_update_post
);
apiRouter.delete(
  "/societyOwner/delete/:id",
  societyOwnerController.societyOwner_delete_post
);
apiRouter.get(
  "/societyOwner/detail/:id",
  societyOwnerController.societyOwner_detail
);

module.exports = apiRouter;
