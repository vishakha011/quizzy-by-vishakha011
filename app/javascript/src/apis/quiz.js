import axios from "axios";

const list = () => axios.get("/quiz");

const quizApi = {
  list,
};

export default quizApi;
