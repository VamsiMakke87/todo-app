const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");

const app = express();
dotenv.config();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/tasks", todoRoute);
app.use("/api/", authRoute);

const connectDB = (async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit process with failure
  }
})();

app.get("/", (req, res) => {
  res.send("Server Started!!");
});

server.listen(8800, () => {
  console.log("Server Started");
});
