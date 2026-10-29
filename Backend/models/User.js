// models/User.js
const { syncSchema } = require("../validations/userValidation");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => syncSchema.shape.firstName.safeParse(v).success,
      message: "Invalid first name"
    }
  },

  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => syncSchema.shape.lastName.safeParse(v).success,
      message: "Invalid last name"
    }
  },

  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => syncSchema.shape.email.safeParse(v).success,
      message: "Invalid email"
    }
  },

  lastLogin: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);