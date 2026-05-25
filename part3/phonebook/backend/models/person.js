require("dotenv").config();
const mongoose = require("mongoose");

// connect to db w/ ipv4
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error.message);
  });

// create person schema and model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: String,
});
personSchema.set("toJSON", {
  transform: (doc, newDoc) => {
    newDoc.id = newDoc._id;
    delete newDoc._id;
    delete newDoc.__v;
    return newDoc;
  },
});
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
