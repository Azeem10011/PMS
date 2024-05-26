const Tax = require("../database/models/TaxModel");
const { getEndpointError, getEndpointSuccess } = require("../utils");

const taxValidation = (addTax) => {
  if (Object.keys(addTax).length < 5) {
    return "All fields are required.";
  }
  if (
    addTax.name == "" ||
    addTax.percentage == 0.0 ||
    addTax.tax_type == "" ||
    addTax.description == ""
  ) {
    return "All fields are required.";
  }
  const regex = /^[+-]?\d+(\.\d+)?$/;
  if (!regex.test(addTax.percentage)) {
    return "Please Enter valid digits";
  }
  return false;
};

// Display list of all taxs.
exports.tax_list = async (req, res, next) => {
  try {
    const taxes = await Tax.find();
    return res.send(getEndpointSuccess(taxes));
  } catch (error) {
    return res.status(400).send(getEndpointError("No taxes found"));
  }
};

// Display detail page for a specific tax.
exports.tax_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tax = await Tax.findOne({ _id: id });
    if (!tax) {
      return res
        .status(400)
        .send(getEndpointError("No tax found with this id"));
    }
    return res.send(getEndpointSuccess(tax));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding tax"));
  }
};

// Handle tax create on POST.
exports.tax_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    const validateTax = taxValidation(data);
    if (validateTax) {
      return res.status(400).send(getEndpointError(validateTax));
    }
    const tax = await Tax.create(data);
    return res.send(getEndpointSuccess(tax));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating tax"));
  }
};

// Handle tax delete on POST.
exports.tax_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tax = await Tax.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("tax deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting buyer"));
  }
};

// Handle tax update on POST.
exports.tax_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const validateTax = taxValidation(data);
    if (validateTax) {
      return res.status(400).send(getEndpointError(validateTax));
    }
    const tax = await Tax.findByIdAndUpdate(data.id, data, { new: true });
    return res.send(getEndpointSuccess(tax));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated tax"));
  }
};
