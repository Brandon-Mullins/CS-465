const fs = require('fs');
const path = require('path');

// Load trips.json
const tripsFile = path.join(__dirname, '../data/trips.json');
let trips = [];

try {
  const data = fs.readFileSync(tripsFile, 'utf8');
  trips = JSON.parse(data);
} catch (err) {
  console.error('Error reading trips.json:', err);
}

const travelList = (req, res) => {
  res.render('travel', { trips });
};

module.exports = {
  travelList
};
