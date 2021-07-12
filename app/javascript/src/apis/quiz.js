import axios from "axios";

const list = () => axios.get("/quiz");

const create = payload => axios.post("/quiz/", payload);

const quizApi = {
  list,
  create,
};

export default quizApi;
