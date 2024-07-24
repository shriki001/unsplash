import { User } from "../models";

// Function to find or create a user
export const findOrCreateUser = async (userDetails: {
  email: string;
  fullName: string;
  fullAddress: string;
  username: string;
}) => {
  // Check if the user already exists
  let user = await User.findOne({ email: userDetails.email });

  if (!user) {
    // Create a new user if it does not exist
    user = new User(userDetails);
    await user.save();
  }

  return user;
};
