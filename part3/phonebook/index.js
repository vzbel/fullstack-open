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

const express = require("express");
const morgan = require("morgan");
const PORT = 3001;
const MATH_LIM = 1e3;
const app = express();

// json middleware
app.use(express.json());

// logging middleware
app.use(morgan("tiny"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// send a page showing # of people
// and time of request
app.get("/info", (req, res) => {
  const peoplePage = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date(Date.now()).toString()}</p>
  </body>
  </html>`;

  res.send(peoplePage);
});

// get one phonebook entry
app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).send({ message: "No person with that id" });
  }
  res.json(person);
});

// remove phonebook entry with the given id
app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  if (!persons.find((p) => p.id === id)) {
    return res.status(404).send({ message: "No person with that id" });
  }

  // delete the person
  persons = persons.filter((p) => p.id !== id);
  res.end();
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

  // no duplicate names
  if (persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(500).send({ error: "Name must be unique" });
  }

  // create it
  const person = {
    id: String(Math.floor(Math.random() * MATH_LIM)),
    name: body.name,
    number: body.number,
  };

  // add to list & send back to client
  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
