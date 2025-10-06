// Seed trips from app_server/data/trips.json into MongoDB
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('../app_api/models/db');   // <-- was app_server
const Trip = require('../app_api/models/trip');      // <-- was app_server

(async () => {
  try {
    const file = path.join(__dirname, '..', 'app_server', 'data', 'trips.json');
    const raw = fs.readFileSync(file, 'utf8');
    // trips.json uses: title, price, start, nights, image
    const json = JSON.parse(raw).map(t => ({
      title: t.title,
      price: t.price,
      startDate: new Date(t.start),
      nights: t.nights,
      image: t.image
    }));

    console.log(`Seeding ${json.length} trips...`);
    await Trip.deleteMany({});
    const result = await Trip.insertMany(json);
    console.log(`Inserted ${result.length} trips.`);
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
