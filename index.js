import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tour_Route from "./Routes/tours.js";
import user_Route from "./Routes/User.js";
import auth_Route from "./Routes/auth.js";
import review_Route from "./Routes/reviews.js";
import booking_Route from "./Routes/booking.js";
import subscriber_Route from "./Routes/subscriptionRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

//database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB CONNECTED");
  } catch (err) {
    console.log("MONGODB CONNECTION FAILED");
    console.log(err); // Log the error message
  }
};

app.get("/", (req, res) => {
  res.send("api is working");
});

//MiddleWare
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/tours", tour_Route);
app.use("/api/v1/users", user_Route);
app.use("/api/v1/auth", auth_Route);
app.use("/api/v1/review", review_Route);
app.use("/api/v1/booking", booking_Route);
app.use("/api/v1/subscribe", subscriber_Route);

app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});
