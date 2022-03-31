require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

let mongoURL = "";

if (process.env.NODE_ENV === "production") {
  mongoURL = process.env.MONGO_URL;
} else {
  mongoURL = "mongodb://localhost/ebb_backend"; // match current mongodb for localhost
}

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Listening in on port: ${PORT}`);
});
