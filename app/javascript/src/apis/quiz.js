import axios from "axios";

const list = () => axios.get("/quiz");

const create = payload => axios.post("/quiz/", payload);

const show = id => axios.get(`/quiz/${id}`);

const update = (id, payload) => axios.put(`/quiz/${id}`, payload);

const destroy = id => axios.delete(`/quiz/${id}`);

const quizApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default quizApi;
