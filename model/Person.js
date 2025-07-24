const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "manager", "waiter"],
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const person = mongoose.model("Person",PersonSchema);

module.exports = person;
