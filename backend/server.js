import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipes.js";
import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favorites.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => res.send("✅ Smart Recipe Backend is running"));
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);



const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`)))
  .catch((err) => console.error("❌ DB Error:", err.message));
