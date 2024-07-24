import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  fullAddress: string;
  username: string;
  email: string;
  // Add other fields as necessary
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    fullAddress: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    // Add other fields as necessary
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export { User, IUser };
