// Express file configuration to accept HTTP requests

import express from "express";
import favicon from "serve-favicon";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import path from "path";

// modules for server side rendering
import React from "react";
import MainRouter from "./../client/MainRouter";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/theme";

//comment out before building for production
import devBundle from "./devBundle";
const app = express();
devBundle.compile(app);

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

app.use(helmet()); // Secure apps by setting various HTTP headers
app.use(cors()); // Enable CORS - Cross Origin Resource Sharing

// Configuring express so that it serves static files from the dist folder
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Returns a middleware to serve favicon
app.use(favicon(path.join(CURRENT_WORKING_DIR, "/favicon.ico")));

app.use("/", userRoutes); // Mount user CRUD route
app.use("/", authRoutes); // Mount protected user auth route

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const ReactDOMServer = require("react-dom/server");
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </StaticRouter>
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    template({
      markup: markup,
      css: css,
    })
  );
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
