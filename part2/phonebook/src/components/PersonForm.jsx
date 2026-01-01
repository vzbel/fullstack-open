const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: 
        <input 
          value={props.newName} 
          onChange={props.onNameChange}
          required
        />
      </div>
      <div>
        number:
        <input 
          value={props.newNumber} 
          onChange={props.onNumberChange} 
          required
        />
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;