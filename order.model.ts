import { Schema, model, Document } from "mongoose";

interface IOrder extends Document {
  imageUrls: string[];
  frameColor: string;
  user: Schema.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    imageUrls: { type: [String], required: true },
    frameColor: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export { Order, IOrder };
