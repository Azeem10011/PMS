const Buyer = require("../database/models/BuyerModel");
const {
  cnicValidator,
  phoneNumberValidator,
  emailValidator,
} = require("../validators");
const { getEndpointError, getEndpointSuccess } = require("../utils");

const validate = (AddClient) => {
  if (
    AddClient.name == "" ||
    AddClient.contact_no == "" ||
    AddClient.cnic == "" ||
    AddClient.permanent_cnic_address == "" ||
    AddClient.father_name == "" ||
    AddClient.nationality == "" ||
    AddClient.province.name == "" ||
    AddClient.email == ""
  ) {
    return "All Field are required.";
  }
  if (!cnicValidator(AddClient.cnic)) {
    return "Please enter valid cnic. ";
  }
  if (!phoneNumberValidator(AddClient.contact_no)) {
    return "Please enter valid contact number";
  }
  if (!emailValidator(AddClient.email)) {
    return "Please enter valid Email ";
  }
  return false;
};

// Display list of all propertys.
exports.buyer_list = async (req, res, next) => {
  try {
    const buyers = await Buyer.find().populate("province").populate("district");
    return res.send(getEndpointSuccess(buyers));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding buyers"));
  }
};

// Display detail page for a specific buyer.
exports.buyer_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const buyer = await Buyer.findOne({ _id: id });
    if (!buyer) {
      return res
        .status(400)
        .send(getEndpointError("No Buyer found with this id"));
    }
    return res.send(getEndpointSuccess(buyer));
  } catch (error) {
    return res.status(400).send(getEndpointError("Error finding buyer"));
  }
};

// Handle buyer create on POST.
exports.buyer_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    const validateBuyer = validate(data);
    if (validateBuyer) {
      return res.status(400).send(getEndpointError(validateBuyer));
    }
    console.log(data);
    const buyer = await Buyer.create({ ...data });
    return res.send(getEndpointSuccess(buyer));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating buyer"));
  }
};

// Handle buyer delete on POST.
exports.buyer_delete_post = async (req, res, next) => {
  try {
    const cnic = req.params.cnic;
    const buyer = await Buyer.deleteOne({ cnic: cnic });
    return res.send(getEndpointSuccess("Buyer deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting buyer"));
  }
};

// Handle buyer update on POST.
exports.buyer_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const validateBuyer = validate(data);
    if (validateBuyer) {
      return res.status(400).send(getEndpointError(validateBuyer));
    }
    const buyer = await Buyer.findByIdAndUpdate(data.id, data, { new: true });
    return res.send(getEndpointSuccess(buyer));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating buyer"));
  }
};
