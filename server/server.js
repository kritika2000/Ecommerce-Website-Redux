const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config({ path: './.env' }); // INFLATE THE ENVIRONMENT VARIABLES
const dbConnect = require('./db/dbConnect'); // IMPORT THE DB CONNECT FUNCTION
const productRouter = require('./routes/productRoutes');

// APPLY THE ROUTER MIDDLEWARE WITH A MOUNT PATH
/**
 * Whenever a request comes to this route, the handler attached to the
 * route inside productRoutes will be executed.
 */
app.use('/api/v1/products', productRouter);

// CONNECT TO THE DB & START THE SERVER
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}...`);
  });
});
