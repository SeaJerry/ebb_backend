const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// app.use(logger("dev"));
// app.use(cors());

app.use("/auth", authRoute);



app.listen("3000", () => {
  console.log("Listening in on port: 3000");
});
