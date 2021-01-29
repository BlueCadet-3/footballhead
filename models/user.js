const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Add the bcrypt library
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6; // 6 is a reasonable value


const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true,
  }
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    league: {
      type: Number,
      required: true,
    },
    team: {
      type: Number,
      max: 1000,
      required: true,
    },
    year: {
      type: Number,
      max: 3000,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    seasons: [seasonSchema],
  },
  {
    timestamps: true,
    // Even though it's hashed - don't serialize the password
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  // Save the reference to the user doc
  const user = this;
  if (!user.isModified("password")) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // Update the password property with the hash
    user.password = hash;
    return next();
  });
});

module.exports = mongoose.model("User", userSchema);
