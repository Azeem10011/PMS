const Phase = require("../database/models/PhaseModel");
const Society = require("../database/models/SocietyModel");
const { getEndpointError, getEndpointSuccess } = require("../utils");

const validateAndSociety = async (data) => {
  if (data.phase_type == "" || data.name == "" || data.description == "") {
    return "All Fileds are required.";
  }
  if (data.longitude <= 0 || data.latitude <= 0) {
    return "Enter Valid longitude/latitude.";
  }
  if (data.per_square_price <= 0) {
    return "Enter Valid per sqaure price.";
  }
  if (data.total_area <= 0) {
    return "Enter Valid Total area";
  }
  let society = await Society.find();
  if (data.phase_type === "commercial") {
    if (
      parseFloat(data.total_area) >
      society[0].commercial_area - society[0].total_occupy_commercial_area
    ) {
      return "Please reduce the area of data.";
    }
    society[0].total_occupy_commercial_area =
      society[0].total_occupy_commercial_area + data.total_area;
  }
  if (data.phase_type === "non-commercial") {
    if (
      parseFloat(data.total_area) >
      society[0].non_commercial_area -
        society[0].total_occupy_non_commercial_area
    ) {
      return "Please reduce the area of data.";
    }
    society[0].total_occupy_non_commercial_area =
      society[0].total_occupy_non_commercial_area + data.total_area;
  }
  society[0].total_occupy_area = society[0].total_occupy_area + data.total_area;
  return society[0];
};

// Display list of all phases.
exports.phase_list = async (req, res, next) => {
  try {
    const phases = await Phase.find()
      .populate("hospital")
      .populate("college")
      .populate("gym")
      .populate("mosque")
      .populate("university")
      .populate("school")
      .populate("park");
    return res.send(getEndpointSuccess(phases));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding phases"));
  }
};

// Display detail page for a specific phase.
exports.phase_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phase = await Phase.findOne({ _id: id })
      .populate("hospital")
      .populate("college")
      .populate("gym")
      .populate("mosque")
      .populate("university")
      .populate("school")
      .populate("park");
    if (!phase) {
      return res
        .status(400)
        .send(getEndpointError("No phase found with this id"));
    }
    return res.send(getEndpointSuccess(phase));
  } catch (error) {
    return res.status(400).send(getEndpointError("Error finding phase"));
  }
};

// Handle phase create on POST.
exports.phase_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    let society = await validateAndSociety(data);
    console.log(data);
    console.log(society);
    if (!society.id) {
      return res.status(400).send(getEndpointError(society));
    }
    data.society = society.id;
    const phase = await Phase.create({ ...data });
    await Society.findByIdAndUpdate(society.id, society, {
      new: true,
    });
    return res.send(getEndpointSuccess(phase));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating phase"));
  }
};

// Handle phase delete on POST.
exports.phase_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phase = await Phase.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("phase deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting phase"));
  }
};

// Handle phase update on POST.
exports.phase_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const phase = await Phase.findByIdAndUpdate(data.id, data, {
      new: true,
    });
    return res.send(getEndpointSuccess(phase));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating phase"));
  }
};
