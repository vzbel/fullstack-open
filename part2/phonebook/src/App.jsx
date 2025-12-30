import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState("");

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
    if(persons.find((p) => (p.name === newName))){
      alert(`${newName} is already added to phonebook`)
    }else if(persons.find((p) => (p.number === newNumber))){
      alert(`${newNumber} is already added to phonebook`)
    }else{
      setPersons(persons.concat(
        {
          name: newName, 
          number: newNumber 
        }
      ));
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
      />
    </div>
  );
}

export default App;