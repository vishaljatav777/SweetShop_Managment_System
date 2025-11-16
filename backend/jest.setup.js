require("dotenv").config();
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
