import axios from "axios";

const instance = axios.create({
  baseURL: "https://korean-exam-52e15-default-rtdb.firebaseio.com/"
});

export default instance;
