import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
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

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  }; 

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(persons.find((p) => (p.name === newName))){
      alert(`${newName} is already added to phonebook`)
    }else if(persons.find((p) => (p.phone === newPhone))){
      alert(`${newPhone} is already added to phonebook`)
    }else{
      setPersons(persons.concat(
        {
          name: newName, 
          phone: newPhone
        }
      ));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with</p>
        <input type="text" value={query} onChange={handleQueryChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input 
            value={newPhone} 
            onChange={handlePhoneChange} 
          />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
      {
        personsToShow.map((person) => (
          <p key={person.name}>
            {person.name} {person.phone}
          </p>
        ))
      }
      </div>
    </div>
  )
}

export default App