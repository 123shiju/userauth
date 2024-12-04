const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DataBase connected...");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = connectDB;
