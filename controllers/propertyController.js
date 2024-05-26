const Property = require("../database/models/PropertyModel");
const Plot = require("../database/models/PlotModel");
const Transaction = require("../database/models/TransactionModel");
const Phase = require("../database/models/PhaseModel");
const Building = require("../database/models/BuildingModel");
const blockchainController = require("./blockchainController");
const mongoose = require("mongoose");
const { getEndpointError, getEndpointSuccess } = require("../utils");
const { populate } = require("../database/models/PlotModel");
mongoose.connect(process.env.MONGO_URI_FULL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Display list of all propertys.
exports.property_list = async (req, res, next) => {
  try {
    const properties = await Property.find();
    return res.send(getEndpointSuccess(properties));
  } catch (error) {
    return res.status(400).send(getEndpointError("No properties found"));
  }
};

// Display detail page for a specific property.
exports.property_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const property = await Property.findOne({ _id: id });
    if (!property) {
      return res
        .status(400)
        .send(getEndpointError("No property found with this id"));
    }
    return res.send(getEndpointSuccess(property));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding property"));
  }
};

exports.get_specific_property_list = async (req, res, next) => {
  try {
    const { phase_id, property_type } = req.params;
    // console.log(property_type);
    const properties = await Property.find({ property_type: property_type });
    // console.log(properties);
    const propertyIds = properties.map((property) => property._id);
    const plotNos = await Plot.find({
      phase: phase_id,
      property: { $in: propertyIds },
    })
      .select("plot_no")
      .populate({
        path: "transactions",
        options: { sort: { createdAt: -1 } },
        populate: { path: "buyer" },
      });
    if (!plotNos) {
      return res
        .status(400)
        .send(getEndpointError("No property found with this id"));
    }
    console.log(plotNos[0].transactions);
    return res.send(getEndpointSuccess(plotNos));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding property"));
  }
};

// Handle property delete on POST.
exports.property_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const property = await Property.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("property deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting property"));
  }
};

// Handle property update on POST.
exports.property_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const property = await Property.updateOne({ _id: data.id }).set(data);
    return res.send(getEndpointSuccess(property));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated property"));
  }
};

const validateData = (data) => {
  if (
    data.buyer == null ||
    data.plot.latitude == null ||
    data.plot.longitude == null ||
    isNaN(data.plot.longitude) ||
    isNaN(data.plot.latitude) ||
    data.plot.no_of_square_feet == null ||
    isNaN(data.plot.no_of_square_feet) ||
    data.plot.taxes.length == 0
  ) {
    return "All Fields are required";
  }
  if (isNaN(data.transaction.price) || data.transaction.price == null) {
    return "All Fields are required";
  }
  if (
    data.phase.total_occupy_area + data.plot.no_of_square_feet >
    data.phase.total_area
  ) {
    return "No more space in this phase";
  }
  return false;
};

const validateBuilding = (data) => {
  if (
    data.buyer == null ||
    data.property.building == null ||
    data.property.building == "" ||
    data.plot.latitude == null ||
    data.plot.longitude == null ||
    isNaN(data.plot.longitude) ||
    isNaN(data.plot.latitude) ||
    data.plot.no_of_square_feet == null ||
    isNaN(data.plot.no_of_square_feet) ||
    data.plot.taxes.length == 0
  ) {
    return "All Fields are required";
  }
  if (data.property.no_of_flats == null || isNaN(data.property.no_of_flats)) {
    return "All Fields are required";
  }
  if (isNaN(data.transaction.price) || data.transaction.price == null) {
    return "All Fields are required";
  }
  if (
    data.phase.total_occupy_area + data.plot.no_of_square_feet >
    data.phase.total_area
  ) {
    return "No more space in this phase";
  }
  return false;
};

exports.property_create_post = async (req, res, next) => {
  const data = req.body;
  const validation = validateData(data);
  if (validation) {
    return res.status(400).send(getEndpointError(validation));
  }
  const conn = mongoose.connection;
  const session = await conn.startSession();
  try {
    session.startTransaction();
    let code = Math.floor(Math.random() * 90000) + 10000;
    while (await Plot.findOne({ plot_no: code })) {
      code = Math.floor(Math.random() * 90000) + 10000;
    }
    const property = await Property.create(
      [
        {
          no_of_rooms: data.property?.no_of_rooms,
          no_of_floors: data.property?.no_of_floors,
          property_type: data.type,
          property_style: data.property.property_style,
          available_for_rent: true,
          on_rent: data.property.on_rent,
        },
      ],
      { session }
    );
    const plot = await Plot.create(
      [
        {
          phase: data.phase,
          property: property[0].toJSON().id,
          no_of_square_feet: data.plot.no_of_square_feet,
          plot_no: code,
          longitude: data.plot.longitude,
          latitude: data.plot.latitude,
          taxes: data.plot.taxes,
        },
      ],
      { session }
    );
    const blockId1 = Math.floor(Math.random() * 900000) + 100000;
    while (await Transaction.count({ blockId: blockId1 })) {
      code = Math.floor(Math.random() * 900000) + 100000;
    }
    const transaction1 = await Transaction.create(
      [
        {
          plot: plot[0].toJSON().id,
          blockId: blockId1,
          price: data.transaction.price,
          payment_method: data.transaction.payment_method,
          is_constructed: data.transaction.is_constructed || true,
        },
      ],
      { session }
    );
    const blockId2 = Math.floor(Math.random() * 900000) + 100000;
    while (
      blockId1 === blockId2 ||
      (await Transaction.count({ blockId: blockId2 }))
    ) {
      code = Math.floor(Math.random() * 900000) + 100000;
    }
    const transaction2 = await Transaction.create(
      [
        {
          buyer: data.buyer,
          plot: plot[0].toJSON().id,
          blockId: blockId2,
          price: data.transaction.price,
          payment_method: data.transaction.payment_method,
          is_constructed: data.transaction.is_constructed || true,
        },
      ],
      { session }
    );
    const phase = await Phase.findOneAndUpdate(
      { _id: data.phase.id },
      {
        $set: {
          total_occupy_area:
            data.phase.total_occupy_area + data.plot.no_of_square_feet,
        },
      },
      { session }
    );
    const updatedPlot = await Plot.updateOne(
      { _id: plot[0].toJSON().id },
      {
        $push: {
          transactions: {
            $each: [transaction1[0].toJSON(), transaction2[0].toJSON()],
          },
        },
      },

      { session }
    );
    console.log(updatedPlot);
    // if (
    //   (await blockchainController.setTransaction({
    //     buyer: data.buyer,
    //     plot: plot[0],
    //     transaction: transaction2[0],
    //     account: data.account,
    //   })) &&
    //   (await blockchainController.getProperty(transaction2[0].blockId))
    // ) {
    //   console.log("BlockChain successfull");
    // } else {
    //   console.log("Blockchain Error");
    //   throw new Error("Blockchain Error");
    // }
    await session.commitTransaction();
    return res.send(getEndpointSuccess(plot));
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(400).send(getEndpointError("Error creating property"));
  }
};

exports.property_create_building_post = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const validation = validateBuilding(data);
  if (validation) {
    return res.status(400).send(getEndpointError(validation));
  }
  const conn = mongoose.connection;
  const session = await conn.startSession();
  try {
    session.startTransaction();
    let code = Math.floor(Math.random() * 90000) + 10000;
    while (await Plot.findOne({ plot_no: code })) {
      code = Math.floor(Math.random() * 90000) + 10000;
    }
    const building = await Building.create(
      [
        {
          name: data.property.building,
          total_no_flats: data.property?.no_of_flats,
        },
      ],
      { session }
    );
    const plot = await Plot.create(
      [
        {
          phase: data.phase,
          building: building[0].toJSON().id,
          no_of_square_feet: data.plot.no_of_square_feet,
          plot_no: code,
          longitude: data.plot.longitude,
          latitude: data.plot.latitude,
          taxes: data.plot.taxes,
        },
      ],
      { session }
    );
    const phase = await Phase.updateOne({ _id: data.phase.id }).set(
      {
        total_occupy_area:
          data.phase.total_occupy_area + data.plot.no_of_square_feet,
      },
      { session }
    );
    await session.commitTransaction();
    return res.send(getEndpointSuccess(plot));
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(400).send(getEndpointError("Error creating property"));
  }
};

exports.property_sell_post = async (req, res, next) => {
  const data = req.body;
  // const validation = validateData(data);
  // if (validation) {
  //   return res.status(400).send(getEndpointError(validation));
  // }
  console.log(data);
  const conn = mongoose.connection;
  const session = await conn.startSession();
  try {
    session.startTransaction();
    const plot = await Plot.findOne({ plot_no: data.plotId });
    if (!plot) {
      return res.status(400).send(getEndpointError("No plot found"));
    }
    const transaction = await Transaction.create(
      [
        {
          buyer: data.buyer.id,
          plot: plot.id,
          price: data.price,
          payment_method: data.payment_method,
          is_constructed: data.is_constructed || true,
        },
      ],
      { session }
    );

    await Plot.updateOne(
      { _id: plot.id },
      {
        $push: {
          transactions: {
            $each: [transaction[0].toJSON().id],
          },
        },
      },
      { session }
    );
    await session.commitTransaction();
    return res.send("Sold");
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(400).send(getEndpointError("Error creating property"));
  }
};

exports.property_rent_post = async (req, res, next) => {
  const data = req.body;
  // const validation = validateData(data);
  // if (validation) {
  //   return res.status(400).send(getEndpointError(validation));
  // }
  console.log(data);
  const conn = mongoose.connection;
  const session = await conn.startSession();
  try {
    session.startTransaction();
    const plot = await Plot.findOne({ plot_no: data.plotId }).populate(
      "property"
    );
    console.log(plot);
    if (!plot) {
      return res.status(400).send(getEndpointError("No plot found"));
    }
    if (!plot.property || !plot.property.available_for_rent) {
      return res
        .status(400)
        .send(getEndpointError("Property not availablle for rent"));
    }

    await Property.updateOne(
      { _id: plot.property.id },
      { $set: { on_rent: data.status } },
      { session }
    );
    await session.commitTransaction();
    return res.send("Sold");
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(400).send(getEndpointError("Error creating property"));
  }
};

exports.verification = async (req, res, next) => {
  try {
    const { plot_no } = req.params;
    const plot = await Plot.findOne({ plot_no })
      .populate("phase")
      .populate("property")
      .populate({
        path: "transactions",
        options: { sort: { createdAt: -1 } },
        populate: { path: "buyer" },
      });
    return res.send(getEndpointSuccess(plot));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated property"));
  }
};
