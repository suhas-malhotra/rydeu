const mongoose = require("mongoose");
const PriceSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  airportFees: {
    type: Number,
    required: true,
  },
  amountPerHour: {
    type: Number,
    required: true,
  },
  amountPerKm: {
    type: Number,
    required: true,
  },
  baseAmount: {
    type: Number,
    required: true,
  },
  baseKms: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Price", PriceSchema);
