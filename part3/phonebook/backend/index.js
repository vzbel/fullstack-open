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
const NO_PERSON_ID = "NoPersonId";
const MISSING_FIELD = "MissingField";
const POST_FAILED = "PostFailed";
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

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      return res.json(persons);
    })
    .catch(next);
});

// send a page showing # of people
// and time of request
app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((numberOfPeople) => {
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
      return res.send(peoplePage);
    })
    .catch(next);
});

// get one phonebook entry
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        const err = new Error();
        err.name = NO_PERSON_ID;
        throw err;
      }
      return res.json(person);
    })
    .catch(next);
});

// remove phonebook entry with the given id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      if (!person) {
        const err = new Error();
        err.name = NO_PERSON_ID;
        throw err;
      }
      return res.json(person);
    })
    .catch(next);
});

// create a new person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.number) {
    const err = new Error("No number provided");
    err.name = MISSING_FIELD;
    return next(err);
  }
  if (!body.name) {
    const err = new Error("No name provided");
    err.name = MISSING_FIELD;
    return next(err);
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
      if(error.name === "ValidationError"){
        return next(error);
      }
      const err = new Error("Failed to add person");
      err.name = POST_FAILED;
      return next(err);
    });
});

// update a person
app.put("/api/persons/:id", (req, res, next) => {
  if (!req.body) {
    const err = new Error("No new fields provided");
    err.name = MISSING_FIELD;
    return next(err);
  }

  Person.findById(req.params.id)
    .then((person) => {
      person.name = req.body.name || person.name;
      person.number = req.body.number || person.number;

      person
        .save()
        .then((newPerson) => {
          res.json(newPerson);
        })
        .catch((error) => {
          if(error.name === "ValidationError"){
            return next(error);
          }
          const err = new Error("Failed to add person");
          err.name = POST_FAILED;
          return next(err);
        });
    })
    .catch(next);
});

// consolidate error handling
const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  switch (err.name) {
    case "CastError":
      return res.status(400).send({ error: "Malformed id" });
    case NO_PERSON_ID:
      return res.status(404).send({ error: "No person with that id" });
    case MISSING_FIELD:
    case "ValidationError":
      return res.status(400).send({ error: err.message });
    case POST_FAILED:
      return res.status(500).send({ error: err.message });
  }

  return res.status(500).end();
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
