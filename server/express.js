// Express file configuration to accept HTTP requests

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

app.use(helmet()); // Secure apps by setting various HTTP headers
app.use(cors()); // Enable CORS - Cross Origin Resource Sharing
app.use("/", userRoutes); // Mount user CRUD route
app.use("/", authRoutes); // Moount protected user auth route

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

// Handling auth-related errors thrown by express-jwt when it tries to validate JWT tokens in incoming requests
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
