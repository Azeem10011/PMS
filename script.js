const mongoose = require("mongoose");
// Import all models explicitly
const Buyer = require("./database/models/BuyerModel");
const District = require("./database/models/DistrictModel");
const Phase = require("./database/models/PhaseModel");
const Plot = require("./database/models/PlotModel");
const Property = require("./database/models/PropertyModel");
const Province = require("./database/models/ProvinceModel");
const PublicPlace = require("./database/models/PublicPlaceModel");
const Role = require("./database/models/RoleModel");
const Society = require("./database/models/SocietyModel");
const SocietyOwner = require("./database/models/SocietyOwnerModel");
const Tax = require("./database/models/TaxModel");
const Transaction = require("./database/models/TransactionModel");
const User = require("./database/models/UserModel");

const Load_database = async () => {
  const list_of_provinces = [
    { name: "Punjab" },
    { name: "Sindh" },
    { name: "Balouchistan" },
    { name: "Khyber Pakhtunkhwa" },
    { name: "Gilgit Baltistan" },
    { name: "Azad Kashmir" },
    { name: "Islamabad" },
  ];

  // Save provinces using insertMany
  const provinces = await Province.insertMany(list_of_provinces);
  console.log("Provinces saved successfully:", provinces);

  const punjab_districts = [
    { name: "Lahore", province: provinces[0]._id },
    { name: "Faisalabad", province: provinces[0]._id },
    { name: "Rawalpindi", province: provinces[0]._id },
    { name: "Multan", province: provinces[0]._id },
    { name: "Gujranwala", province: provinces[0]._id },
    { name: "Sialkot", province: provinces[0]._id },
    { name: "Gujrat", province: provinces[0]._id },
    { name: "Sheikhupura", province: provinces[0]._id },
    { name: "Jhang", province: provinces[0]._id },
    { name: "Sargodha", province: provinces[0]._id },
    { name: "Bahawalpur", province: provinces[0]._id },
    { name: "Sahiwal", province: provinces[0]._id },
    { name: "Okara", province: provinces[0]._id },
    { name: "Vehari", province: provinces[0]._id },
    { name: "Rahim Yar Khan", province: provinces[0]._id },
    { name: "Kasur", province: provinces[0]._id },
    { name: "Nankana Sahib", province: provinces[0]._id },
    { name: "Hafizabad", province: provinces[0]._id },
    { name: "Pakpattan", province: provinces[0]._id },
    { name: "Toba Tek Singh", province: provinces[0]._id },
  ];
  const sindh_districts = [
    { name: "Karachi South", province: provinces[1]._id },
    { name: "Karachi East", province: provinces[1]._id },
    { name: "Karachi West", province: provinces[1]._id },
    { name: "Karachi Central", province: provinces[1]._id },
    { name: "Korangi", province: provinces[1]._id },
    { name: "Malir", province: provinces[1]._id },
    { name: "Hyderabad", province: provinces[1]._id },
    { name: "Sukkur", province: provinces[1]._id },
    { name: "Larkana", province: provinces[1]._id },
    { name: "Nawabshah (Shaheed Benazirabad)", province: provinces[1]._id },
    { name: "Mirpur Khas", province: provinces[1]._id },
    { name: "Jacobabad", province: provinces[1]._id },
    { name: "Shikarpur", province: provinces[1]._id },
    { name: "Khairpur", province: provinces[1]._id },
    { name: "Dadu", province: provinces[1]._id },
    { name: "Thatta", province: provinces[1]._id },
    { name: "Badin", province: provinces[1]._id },
    { name: "Tharparkar", province: provinces[1]._id },
    { name: "Umerkot", province: provinces[1]._id },
    { name: "Ghotki", province: provinces[1]._id },
  ];
  const balochistan_districts = [
    { name: "Quetta", province: provinces[2]._id },
    { name: "Turbat", province: provinces[2]._id },
    { name: "Khuzdar", province: provinces[2]._id },
    { name: "Chaman", province: provinces[2]._id },
    { name: "Gwadar", province: provinces[2]._id },
    { name: "Sibi", province: provinces[2]._id },
    { name: "Zhob", province: provinces[2]._id },
    { name: "Loralai", province: provinces[2]._id },
    { name: "Mastung", province: provinces[2]._id },
    { name: "Kharan", province: provinces[2]._id },
    { name: "Nushki", province: provinces[2]._id },
    { name: "Kalat", province: provinces[2]._id },
    { name: "Panjgur", province: provinces[2]._id },
    { name: "Washuk", province: provinces[2]._id },
    { name: "Awaran", province: provinces[2]._id },
    { name: "Turbat (Kech)", province: provinces[2]._id },
    { name: "Jhal Magsi", province: provinces[2]._id },
    { name: "Jaffarabad", province: provinces[2]._id },
    { name: "Sohbatpur", province: provinces[2]._id },
    { name: "Nasirabad", province: provinces[2]._id },
  ];

  const kpk_districts = [
    { name: "Peshawar", province: provinces[3]._id },
    { name: "Mardan", province: provinces[3]._id },
    { name: "Swat", province: provinces[3]._id },
    { name: "Abbottabad", province: provinces[3]._id },
    { name: "Nowshera", province: provinces[3]._id },
    { name: "Charsadda", province: provinces[3]._id },
    { name: "Kohat", province: provinces[3]._id },
    { name: "Malakand", province: provinces[3]._id },
    { name: "Haripur", province: provinces[3]._id },
    { name: "Dera Ismail Khan", province: provinces[3]._id },
    { name: "Bannu", province: provinces[3]._id },
    { name: "Mansehra", province: provinces[3]._id },
    { name: "Dir", province: provinces[3]._id },
    { name: "Tank", province: provinces[3]._id },
    { name: "Chitral", province: provinces[3]._id },
    { name: "Karak", province: provinces[3]._id },
    { name: "Swabi", province: provinces[3]._id },
    { name: "Batagram", province: provinces[3]._id },
    { name: "Kohistan", province: provinces[3]._id },
    { name: "Shangla", province: provinces[3]._id },
  ];

  const gilgit_baltistan_districts = [
    { name: "Gilgit", province: provinces[4]._id },
    { name: "Skardu", province: provinces[4]._id },
    { name: "Hunza", province: provinces[4]._id },
    { name: "Ghanche", province: provinces[4]._id },
    { name: "Shigar", province: provinces[4]._id },
    { name: "Astore", province: provinces[4]._id },
    { name: "Diamer", province: provinces[4]._id },
    { name: "Nagar", province: provinces[4]._id },
    { name: "Ghizer", province: provinces[4]._id },
  ];

  const azad_kashmir_districts = [
    { name: "Muzaffarabad", province: provinces[5]._id },
    { name: "Mirpur", province: provinces[5]._id },
    { name: "Kotli", province: provinces[5]._id },
    { name: "Rawalakot", province: provinces[5]._id },
    { name: "Bhimber", province: provinces[5]._id },
    { name: "Neelum", province: provinces[5]._id },
    { name: "Sudhnoti", province: provinces[5]._id },
    { name: "Haveli", province: provinces[5]._id },
    { name: "Bagh", province: provinces[5]._id },
    { name: "Poonch", province: provinces[5]._id },
  ];
  districtsData = [
    punjab_districts,
    sindh_districts,
    balochistan_districts,
    kpk_districts,
    gilgit_baltistan_districts,
    azad_kashmir_districts,
  ];

  // Flatten the array of arrays into a single array
  const allDistricts = [].concat(...districtsData);
  const districts = await District.insertMany(allDistricts);
  console.log("Districts saved successfully:", districts);
};

module.exports = {
  Load_database,
};
