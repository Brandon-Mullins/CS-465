require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');

(async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
    await mongoose.connect(uri);
    const existing = await User.findOne({ username: 'admin' });
    if (!existing) {
      await User.create({ username: 'admin', password: '1234' }); // hashed by pre-save
      console.log('Seeded admin -> username: admin  password: 1234');
    } else {
      console.log('Admin already exists');
    }
    process.exit(0);
  } catch (e) {
    console.error(e); process.exit(1);
  }
})();
