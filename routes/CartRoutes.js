import { addToCart,removefromCart,getCart} from "../controllers/CartController.js";
import express from "express";

const router = express.Router();


router.post("/addtocart", addToCart);
router.post("/removefromcart", removefromCart);
router.get("/getcart/:user", getCart);

export default router;
