// File to compile the React Code using Webpack config while in dev mode
import config from "./../config/config";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./../webpack.config.client.js";

// Setting up the compile method that takes the Express app and configures it
// to use the Webpack middleware to compile, bundle and serve code as well as
// enable hot reloading in dev mode.
// This method will be called in server.js

const compile = (app) => {
  if (config.env === "development") {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }
};

export default {
  compile,
};
