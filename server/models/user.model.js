// The user model implementation using Mongoose as schema generator:
// The user schema definition object that's needed to generate the new Mongoose schema will declare all user data fields and associated properties.
// The schema will record user-related information including name, email, created-at and last-updated-at timestamps, hashed passwords, and the associated unique password salt.

import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

// Handling the password string as a virtual field
// The password string that's provided by the user is not stored directly in the user document. Instead, it is handled as a virtual field.
UserSchema.virtual("password")
  // On user creation or password update, encrypt password into new hashed value and set hash_password field along with unique salt value.
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Adding custom validation logic and associating it with the hashed_password field in the schema.
UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

// The encryption logic and salt generation logic, which are used to generate the hashed_password and salt values representing the password value, are defined as UserSchema methods.
UserSchema.methods = {
  // authenticate: This method is called to verify sign-in attempts by matching the user-provided password text with the hashed_password stored in the database for a specific user.
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  // encryptPassword: This method is used to generate an encrypted hash from the plain-text password and a unique salt value using the crypto module from Node.
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  // makeSalt: This method generates a unique and random salt value using the current timestamp at execution and Math.random().
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.model("User", UserSchema);
