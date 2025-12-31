import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        setPersons(res.data)
      })
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