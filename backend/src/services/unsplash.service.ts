import { createApi } from "unsplash-js";
import { config } from "./env.service";
import { RedisService } from "./redis.service";

const unsplash = createApi({
  accessKey: config.unsplashAccessKey,
  fetch,
});

const redisClient = RedisService.getInstance().getClient();

const CACHE_EXPIRATION_TIME = 3600; // 1 hour

export const fetchRandomPhoto = async (count: number): Promise<any> => {
  const cacheKey = "unsplash_random_photo";

  // Check if the data is in cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Serving from cache");
    return JSON.parse(cachedData);
  }

  // Fetch from Unsplash API
  console.log("Serving from unsplash");
  const response = await unsplash.photos.getRandom({ count });
  if (response.errors) {
    throw new Error(response.errors.join(", "));
  }

  const photoData = response.response;

  // Cache the data
  await redisClient.set(cacheKey, JSON.stringify(photoData), {
    EX: CACHE_EXPIRATION_TIME,
  });

  return photoData;
};
