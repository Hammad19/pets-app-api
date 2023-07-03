import configureStripe from "stripe";

const STRIPE_SECRET_KEY =
  "sk_test_51NPgsJSHTV5I3BLldLnpcQPPKBxsFqsu9Ii7u0Cc0Abdg7BxO74LgmXelx76NjKncklajOQJZ6TIcCjlVOvRxMw300eFVdHcZB";

const stripe = configureStripe(STRIPE_SECRET_KEY);

export default stripe;
