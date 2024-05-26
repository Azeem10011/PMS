require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Role = require('../models/Role');

mongoose.connect("mongodb://localhost:27017/PMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, 
})
  .then(async() => {
    console.log('Connected to database');

    if(await Role.count().exec() === 0) {
      console.log('Roles do not exist. Cannot create users');
      process.exit(1);
    }

    console.log('Seeding users...');

    await User.create({
      name: 'Admin',
      email: 'muzammilamin788@gmail.com',
      cnic:"33100-2438061-7",
      contact_no:"0317-7029536",
      password: bcrypt.hashSync('Password788', bcrypt.genSaltSync(10)),
      role: await Role.findOne({ name: 'admin' }).exec()
    });

    console.log('Users seeded!')
    mongoose.disconnect();
  })
  .catch(err => {
    console.log('Failed to connect to database');
    console.error(err);
  });