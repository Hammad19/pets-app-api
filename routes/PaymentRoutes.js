import stripe from "stripe";

const stripeInstance = stripe(
  "sk_test_51LlvcGSJEybDSmwFnaJ9DBmSShhmxwB1u2so68PD2cD2so2qBe9fclt9GGTg32UFz1j6FmqOexHeoozho7KdyvNj00UTJqH6pG"
);

import express from "express";
const router = express.Router();

//post

router.route("/").post(async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.

  //const { amount, currency } = req.body;

  const customer = await stripeInstance.customers.create();
  const ephemeralKey = await stripeInstance.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: 100,
    currency: "INR",
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
