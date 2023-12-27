const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config({ path: './.env' }); // INFLATE THE ENVIRONMENT VARIABLES
const dbConnect = require('./db/dbConnect'); // IMPORT THE DB CONNECT FUNCTION

// CONNECT TO THE DB & START THE SERVER
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}...`);
  });
});
