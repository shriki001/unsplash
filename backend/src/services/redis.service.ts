import { createClient, RedisClientType } from "redis";
import { config } from "./env.service";

class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: config.redisUrl,
    });

    this.client.on("error", (err) => {
      console.error("Redis client error", err);
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async connect(): Promise<RedisClientType> {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log("Connected to Redis");
    }
    return this.client;
  }

  public getClient(): RedisClientType {
    return this.client;
  }
}

export { RedisService };
