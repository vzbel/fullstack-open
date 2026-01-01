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

export default {
    getAll,
    createNew
}