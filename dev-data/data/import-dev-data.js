const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const Reviews = require('../../models/reviewModel');
const Users = require('../../models/userModel');

dotenv.config({ path: `${__dirname}/../../config.env` });
//console.log(process.env.DATABASE)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection sucessful!');
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

console.log('waiting...');
//import data into DB

const importData = async () => {
  try {
    await Tour.create(tours);
    await Users.create(users, { validateBeforeSave: false });
    await Reviews.create(reviews);
    console.log('Data succesfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Users.deleteMany();
    await Reviews.deleteMany();
    console.log('Data succesfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
console.log('_____________________');
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
