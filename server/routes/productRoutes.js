/* 
    EITHER CREATE ROUTES ON THE app OBJECT using app.route.
    TO DO THIS WE NEED TO EXPORT THE app OBJECT TO ALL THE
    ROUTES. 
    SO, WE CAN USE express.router() MIDDLEWARE, TO CREATE
    SEPARATE ROUTERS FOR EACH ROUTE.
*/

const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

// CREATE ROUTER & ATTCHING ROUTER HANDLER/CONTROLLER
router.route('/').get(getAllProducts);

// EXPORT THE ROUTER
module.exports = router;
