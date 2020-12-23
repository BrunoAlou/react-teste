import axios from "axios";

const apiJson = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
});


export default apiJson;