const SocietyOwner = require("../database/models/SocietyOwnerModel");
const Society = require("../database/models/SocietyModel");
const societyOwnerController = require("../controllers/societyOwnerController");
const { getEndpointError, getEndpointSuccess } = require("../utils");

const societyValidation = (society) => {
  if (
    society.amount_paid == 0.0 ||
    society.owner.name == "" ||
    society.owner.cnic == "" ||
    society.owner.contact_no == "" ||
    society.owner.email == "" ||
    society.owner.image == "" ||
    society.owner.about_owner == "" ||
    society.name == "" ||
    society.total_area == 0 ||
    society.commercial_area == 0 ||
    society.non_commercial_area == 0 ||
    society.description == ""
  ) {
    return "All Fields are required!!!";
  }
  if (society.province.name == "") {
    return "Please Select Province.";
  }
  if (society.province.name != "Islamabad" && society.district.name == "") {
    return "Please Select District.";
  }
  if (society.commercial_area > society.total_area * 0.3) {
    return "Only 30% or less Commercial Area Allowed.";
  }
  if (
    society.commercial_area + society.non_commercial_area <
      society.total_area ||
    society.commercial_area + society.non_commercial_area > society.total_area
  ) {
    return "Commercial and  Non-commercial should be  equal to total area.";
  }
  if (society.tax_applied.length == 0) {
    return "Please Select at least one task.";
  }
  if (society.amount_paid < 0) {
    return "Please Enter A valid Amount.";
  }
  return false;
};

const updateSocietyValidation = (editSocietyArea, society) => {
  if (editSocietyArea.total_area < society.total_area) {
    return "You cannot reduce the area of society.";
  }
  if (editSocietyArea.commercial_area < society.commercial_area) {
    return "You cannot reduce the Commercial area of society. You can only increase the area.";
  }
  if (editSocietyArea.non_commercial_area < society.non_commercial_area) {
    return "You cannot reduce the Non-Commercial area of society. You can only increase the area.";
  }
  if (editSocietyArea.commercial_area > editSocietyArea.total_area * 0.3) {
    return "You cannot reduce the area of society.";
  }
  if (
    editSocietyArea.commercial_area + editSocietyArea.non_commercial_area <
      editSocietyArea.total_area ||
    editSocietyArea.commercial_area + editSocietyArea.non_commercial_area >
      editSocietyArea.total_area
  ) {
    return " Commercial and  Non-commercial should be  equal to total area.";
  }
  return false;
};

const createOwner = async (data) => {
  try {
    console.log(data);
    const societyOwner = await SocietyOwner.create({ ...data });
    return societyOwner;
  } catch (error) {
    console.log(error);
  }
};

const deleteOwner = async (id) => {
  try {
    if (id && (await SocietyOwner.count({ _id: id }))) {
      await SocietyOwner.deleteOne({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
};

// Display list of all societys.
exports.society_list = async (req, res, next) => {
  try {
    const societies = await Society.find()
      .populate("owner")
      .populate("province")
      .populate("district")
      .populate("tax_applied");
    if (societies.length === 0)
      return res.status(404).send(getEndpointError("No societies found"));
    return res.send(getEndpointSuccess(societies));
  } catch (error) {
    return res.status(400).send(getEndpointError("No societies found"));
  }
};

// Display detail page for a specific society.
exports.society_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const society = await Society.findOne({ _id: id });
    if (!society) {
      return res
        .status(404)
        .send(getEndpointError("No society found with this id"));
    }
    return res.send(getEndpointSuccess(society));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding society"));
  }
};

// Handle society create on POST.
exports.society_create_post = async (req, res, next) => {
  let societyOwner;
  try {
    const data = req.body;
    console.log(data);
    const validateSociety = societyValidation(data);
    if (validateSociety) {
      return res.status(400).send(getEndpointError(validateSociety));
    }
    societyOwner = await createOwner(data.owner);
    const society = await Society.create({
      ...data,
      province: data.province.id,
      owner: societyOwner.id,
      district: data.district.id,
    });
    return res.send(getEndpointSuccess(society));
  } catch (error) {
    console.log(error);
    deleteOwner(societyOwner?.id);
    return res.status(400).send(getEndpointError("Error creating society"));
  }
};

// Handle society delete on POST.
exports.society_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const society = await Society.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("Society deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting buyer"));
  }
};

// Handle society update on POST.
exports.society_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const prevData = await Society.findOne({ _id: data.id });
    const validateSociety = updateSocietyValidation(data, prevData);
    if (validateSociety) {
      return res.status(400).send(getEndpointError(validateSociety));
    }
    const society = await Society.findByIdAndUpdate(data.id, data, {
      new: true,
    });
    return res.send(getEndpointSuccess(society));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updating society"));
  }
};
