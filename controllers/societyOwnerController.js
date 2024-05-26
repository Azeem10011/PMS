const SocietyOwner = require("../database/models/SocietyOwnerModel");
const { getEndpointError, getEndpointSuccess } = require("../utils");

// Display list of all propertys.
exports.societyOwner_list = async (req, res, next) => {
  try {
    const societyOwners = await SocietyOwner.find();
    return res.send(getEndpointSuccess(societyOwners[0]));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(getEndpointError("Error finding society Owners"));
  }
};

// Display detail page for a specific societyOwner.
exports.societyOwner_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const societyOwner = await SocietyOwner.findOne({ _id: id });
    if (!societyOwner) {
      return res
        .status(400)
        .send(getEndpointError("No society Owner found with this id"));
    }
    return res.send(getEndpointSuccess(societyOwner));
  } catch (error) {
    return res
      .status(400)
      .send(getEndpointError("Error finding society Owner"));
  }
};

// Handle societyOwner create on POST.
exports.societyOwner_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const societyOwner = await SocietyOwner.create({ ...data });
    return res.send(getEndpointSuccess(societyOwner));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(getEndpointError("Error creating society Owner"));
  }
};

// Handle societyOwner delete on POST.
exports.societyOwner_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const societyOwner = await SocietyOwner.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("Society Owner deleted successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(getEndpointError("Error deleting society Owner"));
  }
};

// Handle societyOwner update on POST.
exports.societyOwner_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const societyOwner = await SocietyOwner.findByIdAndUpdate(data.id, data, {
      new: true,
    });
    return res.send(getEndpointSuccess(societyOwner));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(getEndpointError("Error creating society Owner"));
  }
};
