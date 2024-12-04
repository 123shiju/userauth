require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db");
const Routes = require("./Routes/UserRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());

connectDB();

app.use(cors());
app.use("/", Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running");
});
