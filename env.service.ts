import dotenv from "dotenv";

dotenv.config();

export const config: Record<string, string> = {
  mongoUri: process.env.MONGO_URI as string,
  dbName: process.env.DB_NAME as string,
  port: process.env.PORT || "3000",
  redisUrl: process.env.REDIS_URL as string,
  unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY || "",
};
