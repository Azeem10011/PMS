const Province = require("../database/models/ProvinceModel");
const { getEndpointError, getEndpointSuccess } = require("../utils");

// Display list of all provinces.
exports.province_list = async (req, res, next) => {
  try {
    const provinces = await Province.find();
    return res.send(getEndpointSuccess(provinces));
  } catch (error) {
    return res.status(400).send(getEndpointError("No provinces found"));
  }
};

// Display detail page for a specific province.
exports.province_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const province = await Province.findOne({ _id: id });
    if (!province) {
      return res
        .status(400)
        .send(getEndpointError("No province found with this id"));
    }
    return res.send(getEndpointSuccess(province));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding province"));
  }
};

// Handle province create on POST.
exports.province_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    const provCount = await Province.count({ name: data.name });
    if (provCount >= 1) {
      return res.status(400).send(getEndpointError("Province already created"));
    }
    console.log(data);
    const province = await Province.create(data);
    return res.send(getEndpointSuccess(province));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating province"));
  }
};

// Handle province delete on POST.
exports.province_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const province = await Province.deleteOne({ _id: id });
    console.log("Deleting province", id);
    return res.send(getEndpointSuccess("province deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting province"));
  }
};

// Handle province update on POST.
exports.province_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const prov = await Province.findOne({ name: data.name });
    if (prov && prov.id !== data.id) {
      return res.status(400).send(getEndpointError("Province already created"));
    }
   // Find the document by its _id and update other fields
   const province = await Province.findByIdAndUpdate(data.id, data, { new: true });

    return res.send(getEndpointSuccess(province));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated province"));
  }
};
