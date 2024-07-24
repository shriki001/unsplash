import express from "express";
import bodyParser from "body-parser";
import { RedisService, config } from "./services";
import { photosRoute, ordersRoute } from "./routes";
import { connectToDatabase } from "./config";

const app = express();
app.use(bodyParser.json());

app.use("/photos", photosRoute);
app.use("/orders", ordersRoute); // Use the new order routes

const startServer = async () => {
  try {
    // Initialize MongoDB connection
    await connectToDatabase();
    // Initialize Redis connection
    const redisService = RedisService.getInstance();
    await redisService.connect();

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
