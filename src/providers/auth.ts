import axios from "axios";

export const login = () => {
  axios.get(`https://jsonplaceholder.typicode.com/users`);
};
