const Filter = ({ query, onChange }) => {
  return (
    <div>
      <p>filter shown with</p>
      <input type="text" value={query} onChange={onChange}/>
    </div>
  );
};

export default Filter;