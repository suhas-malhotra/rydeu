const express = require("express");
const pricingAPI = require("../../../controllers/pricing_api");
const router = express.Router();

//PRICE API

// API
// GET Price
//API Working
router.get("/price", pricingAPI.getPrice);

module.exports = router;
