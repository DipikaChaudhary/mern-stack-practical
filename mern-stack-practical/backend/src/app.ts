const express = require("express");
const cors = require("cors");
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import notFound from "./middleware/notFound";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use(notFound);
export default app;
