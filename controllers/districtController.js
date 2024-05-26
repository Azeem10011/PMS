const District = require("../database/models/DistrictModel");
const Province = require("../database/models/ProvinceModel");
const { getEndpointError, getEndpointSuccess } = require("../utils");

// Display list of all districts.
exports.district_list = async (req, res, next) => {
  try {
    const districts = await District.find().populate('province');
    return res.send(getEndpointSuccess(districts));
  } catch (error) {
    return res.status(400).send(getEndpointError("No districts found"));
  }
};

// Display districts for a specific province.
exports.district_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const district = await District.find({province: id });
    if (!district) {
      return res
        .status(400)
        .send(getEndpointError("No district found with this id"));
    }
    return res.send(getEndpointSuccess(district));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding district"));
  }
};

// Handle district create on POST.
exports.district_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    const disCount = await District.findOne({ name: data.name });
    if (disCount) {
      return res.status(400).send(getEndpointError("District already exists"));
    }
    const district = await District.create(data);
    await Province.findByIdAndUpdate(data.province, { $push: { districts: district._id } });
    return res.send(getEndpointSuccess(district));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating district"));
  }
};

// Handle district delete on POST.
exports.district_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const district = await District.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("district deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting buyer"));
  }
};

// Handle district update on POST.
exports.district_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    let district = await District.findOne({ name: data.name });
    if (district && district.id !== data.id) {
      return res.status(400).send(getEndpointError("District already exists"));
    }
    const district_obj = await District.findByIdAndUpdate(data.id, data, { new: true });
    return res.send(getEndpointSuccess(district_obj));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated district"));
  }
};
