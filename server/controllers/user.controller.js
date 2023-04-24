// This file defines the controller methods that were used in the user route declarations as callbacks to be executed when a route request is received by the server.
// This controller will make use of the errorHandler helper to respond to route requests with meaningful messages when a Mongoose error occurs.
import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "./error.controller";

/* create: This function creates a new user with the user JSON object that's received in the POST request from the frontend within req.body. 
The call to user.save attempts to save the new user in the database after Mongoose has performed a validation check on the data. 
Consequently, an error or success response is returned to the requesting client.
Using the await keyword inside an async function causes this function to wait until the returned Promise resolves.
*/
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/* list: This function finds all the users from the database, populates only the name, email, created, 
and updated fields in the resulting user list, and then returns this list of users as JSON objects in an array to the requesting client.
*/
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/* userByID: This function uses the value in the :userId parameter to query the database by _id and load the matching user's details.
If a matching user is found in the database, the user object is appended to the request object in the profile key. 
Then, the next() middleware is used to propagate control to the next relevant controller function.
*/
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

/* read: This function retrieves the user details from req.profile and removes sensitive information, 
such as the hashed_password and salt values, before sending the user object in the response to the requesting client.
*/
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

/* update: This function retrieves the user details from req.profile and then uses the lodash module to extend and merge the changes that came in the request body to update the user data.
 */
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/* remove: This function retrieves the user from req.profile and uses the remove() query to delete the user from the database. 
On successful deletion, the requesting client is returned the deleted user object in the response.
*/
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
