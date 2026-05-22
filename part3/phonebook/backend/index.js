/*
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
*/

const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person.js");
const PORT = 3001;
const app = express();

// serve static assets
app.use(express.static("dist"));

// json middleware
app.use(express.json());

// logging middleware
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// send a page showing # of people
// and time of request
app.get("/info", (req, res) => {
  Person.countDocuments({}).then((numberOfPeople) => {
    const peoplePage = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <p>Phonebook has info for ${numberOfPeople} people</p>
      <p>${new Date(Date.now()).toString()}</p>
    </body>
    </html>`;

    res.send(peoplePage);
  });
});

// get one phonebook entry
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        throw new Error();
      }
      res.json(person);
    })
    .catch((error) => {
      return res.status(404).send({ message: "No person with that id" });
    });
});

// remove phonebook entry with the given id
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then((person) => {
    if(!person){
      return res.status(204).end();
    }
    return res.json(person);
  }).catch((error) => {
    return res.status(400).send({ message: "Malformed id"});
  });
});

// create a new person
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.number) {
    return res.status(500).send({ error: "No number provided" });
  }
  if (!body.name) {
    return res.status(500).send({ error: "No name provided" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(person);
    })
    .catch((error) => {
      res.status(500).send({ error: "Failed to add person" });
    });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
