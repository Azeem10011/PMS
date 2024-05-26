const Plot = require("../database/models/PlotModel");
const blockchainController = require("./blockchainController");
const { getEndpointError, getEndpointSuccess } = require("../utils");

// Display list of all plots.
exports.plot_list = async (req, res, next) => {
  try {
    const plots = await Plot.find();
    return res.send(getEndpointSuccess(plots));
  } catch (error) {
    return res.status(400).send(getEndpointError("No plots found"));
  }
};

// Display detail page for a specific plot.
exports.plot_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const plot = await Plot.findOne({ _id: id });
    if (!plot) {
      return res
        .status(400)
        .send(getEndpointError("No plot found with this id"));
    }
    return res.send(getEndpointSuccess(plot));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error finding plot"));
  }
};

// Handle plot create on POST.
exports.plot_create_post = async (req, res, next) => {
  try {
    const data = req.body;
    const plot = await Plot.create(data);
    return res.send(getEndpointSuccess(plot));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error creating plot"));
  }
};

// Handle plot delete on POST.
exports.plot_delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const plot = await Plot.deleteOne({ _id: id });
    return res.send(getEndpointSuccess("Plot deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error deleting buyer"));
  }
};

// Handle plot update on POST.
exports.plot_update_post = async (req, res, next) => {
  try {
    const data = req.body;
    const plot = await Plot.updateOne({ _id: data.id }).set(data);
    return res.send(getEndpointSuccess(plot));
  } catch (error) {
    console.log(error);
    return res.status(400).send(getEndpointError("Error updated plot"));
  }
};

exports.plot_list_populated = async (req, res, next) => {
  try {
    const plots = await Plot.find()
      .populate("property")
      .populate("phase")
      .sort({ createdAt: -1 })
      .limit(20);
    return res.send(getEndpointSuccess(plots));
  } catch (error) {
    return res.status(400).send(getEndpointError("No plots found"));
  }
};

exports.get_block = async (req, res) => {
  const { block_id } = req.params;
  try {
    const block = await blockchainController.getProperty(block_id);
    let transaction = {};
    let buyer = {};
    let plot = {};
    buyer.name = block[1]?.name;
    buyer.email = block[1]?.email;
    buyer.contact_no = block[1]?.contact_no;
    buyer.cnic = block[1]?.cnic;
    plot.phase = block[2]?.phase;
    plot.plot_no = block[2]?.plot_no;
    plot.property = block[2]?.property;
    plot.no_of_square_feet = block[2]?.no_of_square_feet;
    transaction.blockId = block[0];
    transaction.price = block[3];
    transaction.buyer = buyer;
    transaction.plot = plot;
    console.log(transaction);

    return res.send(getEndpointSuccess(transaction));
  } catch (error) {
    return res.status(400).send(getEndpointError("No plots found"));
  }
};
