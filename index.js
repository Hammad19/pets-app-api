import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import dbConnection from "./configs/db_connection.js";
import userRoutes from "./routes/UserRoutes.js";
import petRoutes from "./routes/PetRoutes.js";
import accessoriesRoutes from "./routes/AccessoriesRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import rev from "./routes/ReviewRoute.js";
import orderRoutes from "./routes/OrderRoutes.js";
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
// CORS POLICY
app.use(cors());
// JSON PARSER
app.use(express.json());

// DB CONNECTION
dbConnection(process.env.DATABASE_URL);



// ROUTES


app.use("/api/users", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/accessories", accessoriesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", rev);
app.use("/api/orders", orderRoutes);



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
