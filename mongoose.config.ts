import { DbService, config } from "../services";

const dbService = DbService.getInstance();

const connectToDatabase = async () => {
  await dbService.connect(config.mongoUri);
};

export { connectToDatabase };
