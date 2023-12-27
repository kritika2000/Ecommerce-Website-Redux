const mongoose = require('mongoose');
const password = process.env.DB_PASSWORD;
const uri = process.env.DB_URI;

// GET DATABASE URI FOR DB CONNECTION
const dbURI = uri.replace('<password>', password);

// CREATE DB CONNECTION
function dbConnect() {
  return mongoose.connect(dbURI, {
    dbName: 'Ecommerce',
  });
}

console.log(dbURI);

// DECLARE CONNECTION EVENTS
mongoose.connection.on('connecting', () =>
  console.log('Connecting to the DB...')
);
mongoose.connection.on('connected', () => console.log('Connected to the DB'));
mongoose.connection.on('error', () =>
  console.log('❌ Connection to the DB failed')
);

module.exports = dbConnect;
