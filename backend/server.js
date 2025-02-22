import "dotenv/config";
import mongoose from "mongoose";

import app from "./app.js";

const { DB_USERNAME, DB_PASSWORD } = process.env;

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zqlss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
