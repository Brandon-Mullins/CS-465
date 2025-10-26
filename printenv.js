require('dotenv').config();

console.log('ADMIN_EMAIL   =', JSON.stringify(process.env.ADMIN_EMAIL));
console.log('ADMIN_PASSWORD=', JSON.stringify(process.env.ADMIN_PASSWORD));
console.log('JWT_SECRET    =', JSON.stringify(process.env.JWT_SECRET));
