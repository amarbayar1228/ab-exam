import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger2023-22393-default-rtdb.firebaseio.com/"
});

export default instance;
