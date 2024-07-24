import mongoose from "mongoose";

// Mongoose connection management
class DbService {
  private static instance: DbService;

  private constructor() {}

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  public async connect(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
      console.log("Successfully connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit process with failure
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}

export { DbService };
