import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((err) => {
        alert("Error retrieving persons from server");
      });
  }, []);

  const personsToShow = query ? 
    persons.filter((p) => (
      p.name
      .toLowerCase()
      .includes(query.toLowerCase())
    ))
    : 
    persons;

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }; 

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson =  
      persons.find((p) => p.name === newName) ||
      persons.find((p) => p.number === newNumber);
    
    const replacePrompt = existingPerson ? `${existingPerson.name}, ${existingPerson.number} is already added to phone book, replace the old number with a new one?` : "";

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if(!existingPerson){
      personService
        .createNew(newPerson)
        .then((p) => {
          setPersons(persons.concat(p));
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          alert("Error creating person");
        });
    }else if(window.confirm(replacePrompt)){
      newPerson.id = existingPerson.id;
      personService
        .update(newPerson)
        .then((p) => {
          setPersons(persons.map((p2) => p2.id === newPerson.id ? newPerson : p2))
          setNewName("")
          setNewNumber("")
        })
        .catch((err) => {
          alert("Error updating person")
        });
    }
  };

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.name !== person.name));
        })
        .catch(() => {
          alert(`Error deleting ${person.name}`)
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        query={query} 
        onChange={handleQueryChange} 
      />

      <h3>Add a New</h3>
      <PersonForm 
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;