const express = require("express");
const axios = require("axios");

const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://suhass:pooja@cluster0.rspit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db("suhas");
const Price = db.collection("Price");

module.exports.getPrice = async (req, res) => {
  const { fromAddress, toAddress, vehicle } = res.body;
  let distance = {
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?addressfrom=${fromAddress}&sensor=false&key=${process.env.GEO_API}&addressTo=${toAddress}`,
  };

  if (distance > 1000) {
    return res.status(404).json({ msg: "Distance is very much" });
  }
  const vehicleCosting = Price.findOne({ vehicle }, function (err) {
    if (err) {
      return res.status(404).json({ msg: "Something Went Wrong" });
    }
  });

  let price = 0;

  if (vehicleCosting.baseKms >= distance) {
    price = vehicleCosting.baseAmount;
  } else {
    price = vehicleCosting.baseAmount;
    distance = distance - vehicleCosting.baseKms;

    let restKms = distance * vehicleCosting.AmountPerKm;
    price += restKms;
  }
  if (price > 50) {
    return res.status(200).json(true);
  } else {
    return res.status(200).json(price);
  }
};
