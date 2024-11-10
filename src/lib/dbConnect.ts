import mongoose from "mongoose";

type connectionObect = {
  isConnected?: number;
};

const connection: connectionObect = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to db");
    return;
  } else {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI as string, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      });
      connection.isConnected = db.connections[0].readyState;
      console.log("Connected to db");
    } catch (error) {
      console.log("Error connecting to db", error);
      process.exit(1);
    }
  }
}

export default dbConnect;
