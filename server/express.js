// Express file configuration to accept HTTP requests

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";

const app = express();
// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

app.use(helmet()); // Secure apps by setting various HTTP headers
app.use(cors()); // Enable CORS - Cross Origin Resource Sharing
app.use("/", userRoutes); // Mount user API route

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

export default app;
