import stripe from "stripe";

const stripeInstance = stripe(
  "pk_test_51Mqeq8KDY8BdPBdpUFFqFL3hy1MUAkdnzBBqQmMz9HANripV4VGmLcOWM9GkBQWEDo4J2s9ylgaJ0XCIbvvuSh3N00IGVBVP0h"
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
