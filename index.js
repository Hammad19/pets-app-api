import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import dbConnection from "./configs/db_connection.js";
import userRoutes from "./routes/UserRoutes.js";
import petRoutes from "./routes/PetRoutes.js";
import accessoriesRoutes from "./routes/AccessoriesRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import imageRoutes from "./routes/ImageRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
import ReviewRoutes from "./routes/ReviewRoutes.js";
import DoctorRoutes from "./routes/DoctorRoutes.js";
import paymentApi from "./routes/PaymentRoutes.js";

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

app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/accessories", accessoriesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/payment", paymentApi);
app.use("/api/doctors", DoctorRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
