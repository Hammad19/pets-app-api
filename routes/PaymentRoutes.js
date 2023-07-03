import stripe from "../constants/stripe.js";
import express from "express";
const router = express.Router();

const postStripeCharge = (res) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.route("/").get((req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString(),
  });
});

//post

router.route("/").post((req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
});

export default router;
