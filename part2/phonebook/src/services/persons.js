import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

const createNew = (person) => {
  const req = axios.post(baseURL, person);
  return req.then((res) => res.data);
};

const update = (person) => {
  const req = axios.put(`${baseURL}/${person.id}`, person);
  return req.then((res) => res.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseURL}/${id}`);
  return req.then((res) => res.data);
};

export default {
  getAll,
  createNew,
  remove,
  update
};
