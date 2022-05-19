const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT Exception, shutting down....');
  console.log('1.', err.name, '\n2.', err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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

const port = process.env.PORT || 3000;

const server = app.listen(3000, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('1.', err.name, '\n2.', err.message);
  console.log('UNHANDLED Rejection, shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
