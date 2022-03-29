const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));



app.use("/auth", authRoute);
app.use("/posts", postsRoute);



app.listen("3000", () => {
  console.log("Listening in on port: 3000");
});
