import { ObjectId } from "mongodb";
import { Order, User } from "../models";
import { Types } from "mongoose";

// Function to create or find a user and then create an order
export const createOrder = async (orderDetails: {
  email: string;
  imageUrls: string[];
  frameColor: string;
  user?: {
    _id?: Types.ObjectId;
  };
}) => {
  // Create and save the order with the user's ObjectId
  const order = new Order({
    email: orderDetails.email,
    imageUrls: orderDetails.imageUrls,
    frameColor: orderDetails.frameColor,
    user: orderDetails.user?._id, // Use the ObjectId of the created or found user
  });

  return await order.save();
};
export const getOrdersByUser = async (userId: string) => {
  const objectId = new ObjectId(userId);
  return await Order.find({ user: objectId });
};
