const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({


  "fname": {
    type: String,
    required: "first Name is required",
    trim: true,
  },

  "lname": {
    type: String,
    required:  "last Name is required",
    trim: true,
  },

  "title": {
    type: String,
    required: "title is required",
    enum: ["Mr", "Mrs", "Miss", "must"],
   
  },

  "emailId": {
    type: String,
    required: "Email address is required",
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please fill a valid email address",
    }
  },

  "password": {
    type: String,
    required: "password is required",
    trim: true
  }

}, { timestamps: true })

module.exports = mongoose.model("author", authorSchema)