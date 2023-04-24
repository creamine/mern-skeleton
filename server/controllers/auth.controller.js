// This file defines the controller methods that handle requests to the signin and signout routes,
// and provide JWT and express-jwt functionality to enable authentication and authorization for protected user API endpoints.
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";

/* signin: This function receives the email and password in req.body. 
This email is used to retrieve a matching user from the database. 
Then, the password authentication method defined in UserSchema is used to verify the password that's received in req.body from the client.
*/
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

/* signout: This function clears the response cookie containing the signed JWT. 
This is an optional endpoint and not really necessary for auth purposes if cookies are not used at all in the frontend.
*/
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

// To protect access to the read, update, and delete routes, the server will need to check that the requesting client is actually an authenticated and authorized user.

// requireSignin: This function verifies that the incoming request has a valid JWT in the Authorization header.
// We can add requireSignin to any route that should be protected against unauthenticated access.
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

/* hasAuthorization: This function will check whether the authenticated user is the same as the user being updated 
or deleted before the corresponding CRUD controller function is allowed to proceed.
*/
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
