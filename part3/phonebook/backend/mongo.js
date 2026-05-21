const mongoose = require("mongoose");

// no password
if (process.argv.length <= 2) {
  console.error("password not provided");
  process.exit(1);
}

// connect to db w/ ipv4
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.oczjvgd.mongodb.net/persons?appName=Cluster0`;
mongoose.connect(url, { family: 4 });

// create schema and model
const PersonSchema = new mongoose.Schema({
  name: String,
  phone: String,
});
const Person = mongoose.model("Person", PersonSchema);

// just retrieve all persons
if (process.argv.length === 3) {
  const persons = Person.find({}).then((result) => {
    if (result.length === 0) {
      console.log("phonebook is empty");
    } else {
      console.log("phonebook:");
      result.forEach((p) => {
        console.log(`${p.name} ${p.phone}`);
      });
    }
    mongoose.connection.close();
  });
  return;
}

if (process.argv.length === 5) {
  // add a new person given by args
  const name = process.argv[3];
  const phone = process.argv[4];

  // make new person in db
  const person = new Person({ name, phone });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.phone} to phonebook`);
    mongoose.connection.close();
  });
  return;
}

mongoose.connection.close();
