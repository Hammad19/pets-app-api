import stripe from "stripe";

const stripeInstance = stripe(
  "sk_test_51Mqeq8KDY8BdPBdpBiv5JR6IPkDYABWv75vnSiPZFjIXb1NSXHQXAE0ql6yNJZDOzuts6FhQna0Re5VGDANhqFUn002e0DJP5F"
);

import express from "express";
const router = express.Router();

//post

router.route("/").post(async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.

  const { amount, currency } = req.body;

  const customer = await stripeInstance.customers.create();
  const ephemeralKey = await stripeInstance.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    payment_method_types: ["card"],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

export default router;
