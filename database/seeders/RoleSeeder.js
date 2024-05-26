require('dotenv').config(); // for using .env file  
const mongoose = require('mongoose');
const Role = require('../models/Role');

mongoose.connect("mongodb://localhost:27017/PMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
})
  .then(async() => {
    console.log('Connected to database');

    if(await Role.find({ role: 'admin' }).count().exec() != 0) {
      console.log('Roles already exist');
      process.exit(1);
    }

    console.log('Seeding roles...');

    await Role.create({
      name: 'admin',
    });

    console.log('Roles seeded!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.log('Failed to connect to database');
    console.error(err);
  });