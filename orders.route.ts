import express, { Request, Response } from "express";
import { getOrdersByUser, createOrder, findOrCreateUser } from "../services";
import { Types } from "mongoose";

const ordersRoute = express.Router();

ordersRoute.post("/", async (req: Request, res: Response) => {
  const {
    email,
    imageUrls,
    frameColor,
    user,
    fullAddress,
    fullName,
    username,
  } = req.body;

  // Validate the request body
  if (
    !email ||
    !imageUrls ||
    !frameColor ||
    !fullAddress ||
    !fullName ||
    !username
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the user exists
    const existingUser = await findOrCreateUser({
      email,
      fullAddress,
      fullName,
      username,
    });

    // Create and save the order with the user's ObjectId
    const order = await createOrder({
      email,
      imageUrls,
      frameColor,
      user: existingUser?._id as Types.ObjectId,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
});

ordersRoute.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Validate the userId
  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const orders = await getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching orders" });
  }
});

export { ordersRoute };
