const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

//Server Side Values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyltyRate = 2; //2 points per 1$

//Create an endpoint that takes a newItemPrice and cartTotal
//as a query parameter and returns total cart value.
function calculateTotalCartPrice(newItemPrice, cartTotal) {
  let totalCartPrice;
  totalCartPrice = newItemPrice + cartTotal;
  return totalCartPrice.toString();
}
//Declare an endpoint cart-total
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalCartPrice(newItemPrice, cartTotal));
});

//Create an endpoint that takes a cartTotal and isMember as a query
//parameter and returns final price after applying the discount.
function calculateDiscount(cartTotal, isMember) {
  if (isMember) {
    let finalPrice;
    finalPrice = cartTotal - cartTotal * (discountPercentage / 100);
    return finalPrice.toString();
  } else {
    return cartTotal;
  }
}
//Declare an endpoint /membership-discount
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(calculateDiscount(cartTotal, isMember));
});

//Create an endpoint that takes a cartTotal as a query parameter and
//returns the tax applied on the Cart Total.
function calculateTaxAmount(cartTotal) {
  let taxAmount;
  taxAmount = cartTotal * (taxRate / 100);
  return taxAmount.toString();
}

//Declare an endpoint /calculate-tax
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTaxAmount(cartTotal));
});

//Create an endpoint that takes a shippingMethod and distance as a
//query parameter and returns the number of days for delivering the
//package.
function estimatedDeliveryDay(shippingMethod, distance) {
  let estimatedDays;
  if (shippingMethod == 'standard') {
    estimatedDays = distance / 50;
    return estimatedDays.toString();
  } else {
    estimatedDays = distance / 100;
    return estimatedDays.toString();
  }
}

//Declare an endpoint /estimate-delivery
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimatedDeliveryDay(shippingMethod, distance));
});

//Create an endpoint that takes weight and distance as query
// parameters and returns the shipping cost of the packages.
function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}
//Declare an endpoint /shipping-cost
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

//Create an endpoint that takes purchaseAmount as query parameters
// and returns the loyalty points.
function calculateLoyaltyPoints(purchaseAmount) {
  let pointsEarn;
  pointsEarn = purchaseAmount * 2;
  return pointsEarn.toString();
}
//Declare an endpoint /loyalty-points
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
