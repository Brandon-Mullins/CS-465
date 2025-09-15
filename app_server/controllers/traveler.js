// Controller functions for public pages

// Home page (HBS view)
const home = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    year: new Date().getFullYear()
  });
};

// Travel page (dynamic list proves templating works)
const travel = (req, res) => {
  res.render('travel', {
    title: 'Travel',
    trips: [
      { title: 'Hawaii – Honolulu', price: 1299, start: '2025-12-10', nights: 6, image: '/images/travel_1.jpg' },
      { title: 'Cancún – All Inclusive', price: 999, start: '2025-11-03', nights: 5, image: '/images/travel_2.jpg' },
      { title: 'Alaska Cruise', price: 1899, start: '2026-05-21', nights: 7, image: '/images/travel_3.jpg' }
    ]
  });
};

module.exports = { home, travel };
