const mongoose = require("mongoose");
const Buyer = require("./models/BuyerModel");
const District = require("./models/DistrictModel");
const Phase = require("./models/PhaseModel");
const Plot = require("./models/PlotModel");
const Property = require("./models/PropertyModel");
const Province = require("./models/ProvinceModel");
const PublicPlace = require("./models/PublicPlaceModel");
const Role = require("./models/RoleModel");
const Society = require("./models/SocietyModel");
const SocietyOwner = require("./models/SocietyOwnerModel");
const Tax = require("./models/TaxModel");
const Transaction = require("./models/TransactionModel");
const User = require("./models/UserModel");
const Verification = require("./models/VerificationModel");
mongoose.modelSchemas = {
  Buyer,
  District,
  Phase,
  Plot,
  Property,
  Province,
  PublicPlace,
  Role,
  Society,
  SocietyOwner,
  Tax,
  Transaction,
  User,
  Verification,
};

async function connect_database() {
  // mongoose connection
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI_FULL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
      })
      .catch((err) => {
        console.log("database connection failed. exiting now...");
        console.error(err);
      });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function dropDatabase() {
  try {
    const db = await connect_database();
    await db.dropDatabase();
    console.log("Database dropped successfully.");
  } catch (error) {
    console.error("Error dropping the database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed");
  }
}

module.exports = {
  connect_database,
  dropDatabase,
};
