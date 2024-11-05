import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import "dotenv/config";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto: ${port}`);
});
