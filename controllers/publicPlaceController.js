const Phase = require("../database/models/PhaseModel");
const PublicPlace = require("../database/models/PublicPlaceModel");
const { getEndpointError, getEndpointSuccess } = require("../utils");

const invalidPlace = async (publicPlaceData) => {
  if (
    publicPlaceData.property_type == "" ||
    publicPlaceData.phase == "" ||
    publicPlaceData.description == "" ||
    publicPlaceData.name == "" ||
    publicPlaceData.no_of_square_feet == 0.0
  ) {
    return "All Fields are required.";
  }
  if (publicPlaceData.no_of_square_feet <= 0) {
    return "no of square feet should be greater than zero.";
  }
  const phase = await Phase.findOne({ _id: publicPlaceData.phase });
  if (!phase) {
    return "No phase found";
  }
  if (
    publicPlaceData.no_of_square_feet >
    phase.total_area - phase.total_occupy_area
  ) {
    return `Please reduce the no of square feet. You have only${
      filterPhase.total_area - filterPhase.total_occupy_area
    } square feet. `;
  }
  return false;
};

// const updatePhase = async (place) => {
//   const phase = await Phase.findOne({ _id: place.phase });
//   const area = phase.total_occupy_area + place.no_of_square_feet;
//   if (place.property_type === "Hospital") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       hospital: place.id,
//       total_occupy_area: area,
//     });
//   } else if (place.property_type === "Gym") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       gym: place.id,
//       total_occupy_area: area,
//     });
//   } else if (place.property_type === "College") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       college: place.id,
//       total_occupy_area: area,
//     });
//   } else if (place.property_type === "School") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       school: place.id,
//       total_occupy_area: area,
//     });
//   } else if (place.property_type === "Park") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       park: place.id,
//       total_occupy_area: area,
//     });
//   } else if (place.property_type === "University") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       university: place.id,
//       total_occupy_area: area,
//     });
//   } else if (place.property_type === "Mosque") {
//     await Phase.updateOne({ _id: place.phase }).set({
//       mosque: place.id,
//       total_occupy_area: area,
//     });
//   }
// };

const updatePhase = async (place) => {
  const phase = await Phase.findOne({ _id: place.phase });
  const updateFields = {
    total_occupy_area: phase.total_occupy_area + place.no_of_square_feet,
  };

  switch (place.property_type) {
    case "Hospital":
      updateFields.hospital = place.id;
      break;
    case "Gym":
      updateFields.gym = place.id;
      break;
    case "College":
      updateFields.college = place.id;
      break;
    case "School":
      updateFields.school = place.id;
      break;
    case "Park":
      updateFields.park = place.id;
      break;
    case "University":
      updateFields.university = place.id;
      break;
    case "Mosque":
      updateFields.mosque = place.id;
      break;
    default:
      throw new Error("Invalid property type");
  }

  await Phase.updateOne({ _id: place.phase }, { $set: updateFields });
};

// Display list of all publicPlaces.
exports.publicPlace_list = async (req, res, next) => {
  try {
    const publicPlaces = await PublicPlace.find();
    return res.send(getEndpointSuccess(publicPlaces));
  } catch (error) {
    return res.status(400).send(getEndpointError("No properties found"));
  }
};

// Display detail page for a specific publicPlace.
exports.publicPlace_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const publicPlace = await PublicPlace.findOne({ _id: id });
    if (!publicPlace) {
      return res
        .status(400)
        .send(getEndpointError("No publicPlace found with this id"));
    }
    return res.send(getEndpointSuccess(publicPlace));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding publicPlace"));
  }
};

// Handle publicPlace create on POST.
exports.publicPlace_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const invalid = await invalidPlace(data);
    if (invalid) {
      return res.status(400).send(getEndpointError(invalid));
    }
    const publicPlace = await PublicPlace.create(data);
    await updatePhase(publicPlace);
    return res.send(publicPlace);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(getEndpointError("Error creating Public Place"));
  }
};

// Handle publicPlace delete on POST.
exports.publicPlace_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const publicPlace = await PublicPlace.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("publicPlace deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting publicPlace"));
  }
};

// Handle publicPlace update on POST.
exports.publicPlace_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const publicPlace = await PublicPlace.updateOne({ _id: data.id }).set(data);
    return res.send(getEndpointSuccess(publicPlace));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated publicPlace"));
  }
};
