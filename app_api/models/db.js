require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

mongoose.connect(uri /*, { } */);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${uri}`);
});

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown (Ctrl+C)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose disconnected through app termination');
  process.exit(0);
});

module.exports = mongoose;
