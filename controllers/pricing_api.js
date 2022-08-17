const express = require("express");
const axios = require("axios");
const Price = require("../model/vehicle");

module.exports.getPrice = async (req, res) => {
  const { fromAddress, toAddress, vehicle } = res.body;
  let options = {
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?addressfrom=${fromAddress}&sensor=false&key=${process.env.GEO_API}&addressTo=${toAddress}`,
  };
  //finding distance using google api
  const distance = await axios(options);

  //Throw ERROR
  //distance greater than 1000
  if (distance > 1000) {
    return res.status(404).json({ msg: "Distance is very much" });
  }
  //which vichle is used
  const vehicleCosting = Price.findOne({ vehicle }, function (err) {
    if (err) {
      return res.status(404).json({ msg: "Something Went Wrong" });
    }
  });

  //Throw ERROR
  //if no vehicle with given name is found
  if (vehicleCosting.length == 0) {
    return res.status(404).json({ msg: "Type of Vehicle is Invalid" });
  }
  let price = 0;
  //calculation the cost
  if (vehicleCosting.baseKms >= distance) {
    price = vehicleCosting.baseAmount;
  } else {
    price = vehicleCosting.baseAmount;
    distance = distance - vehicleCosting.baseKms;

    let restKms = distance * vehicleCosting.AmountPerKm;
    price += restKms;
  }
  //price greater than 50 email is needed
  if (price > 50) {
    return res.status(200).json({ msg: "Email Neeeded", bool: true });
  } else {
    return res.status(200).json(price);
  }
};
