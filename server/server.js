const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config({ path: './.env' }); // INFLATE THE ENVIRONMENT VARIABLES
const dbConnect = require('./db/dbConnect'); // IMPORT THE DB CONNECT FUNCTION
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRoutes');
const authRouter = require('./routes/authRouter');
const logoutRouter = require('./routes/logoutRoutes');
const corsOptions = require('./config/corsOptions');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// APPLY MIDDLEWARE TO PARSE JSON DATA COMING FROM CLIENT
app.use(express.json());

// APPLY CORS MIDDLEWARE TO SERVE REQUESTS FROM CROSS DOMAINS
app.use(cors(corsOptions));

// APPLY MIDDLEWARE TO PARSE COOKIES
app.use(cookieParser());

/**
 * APPLY THE ROUTER MIDDLEWARE WITH A MOUNT PATH
 * Whenever a request comes to this route, the handler attached to the
 * route inside routes will be executed.
 */
app.use('/api/v1/products', productRouter);

app.use('/api/v1/cart', cartRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/login', loginRouter);

app.use('/api/v1/logout', logoutRouter);

app.use('/api/v1/authorize', authRouter);

// CONNECT TO THE DB & START THE SERVER
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}...`);
  });
});
