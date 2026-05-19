import Person from "./Person";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {
        persons.map((p) => (
          <Person 
            key={p.name} 
            person={p}
            onDelete={onDelete}
          />
        ))
      }
    </div>
  );
};

export default Persons;