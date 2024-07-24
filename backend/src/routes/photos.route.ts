import { Router } from "express";
import { fetchRandomPhoto } from "../services";

const photosRoute = Router();

photosRoute.get("/", async (req, res) => {
  const count = parseInt(req.query.count as string, 10) || 1;
  try {
    const data = await fetchRandomPhoto(count);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error connecting to the database");
  }
});

export { photosRoute };
