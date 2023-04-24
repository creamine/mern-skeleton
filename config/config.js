/*
The config variables that were defined are as follows:

    - env: To differentiate between development and production modes
    - port: To define the listening port for the server
    - jwtSecret: The secret key to be used to sign JWT
    - mongoUri: The location of the MongoDB database instance for the project

These variables will give us the flexibility to change values from a single file and use it across the backend code. 
Next, we will add the run scripts, which will allow us to run and debug the backend implementation.

*/

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};

export default config;
