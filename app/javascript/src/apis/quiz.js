import axios from "axios";

const list = () => axios.get("/quiz");

const create = payload => axios.post("/quiz/", payload);

const show = id => axios.get(`/quiz/${id}`);

const update = (id, payload) => axios.put(`/quiz/${id}`, payload);

const destroy = id => axios.delete(`/quiz/${id}`);

const publish = id => axios.get(`/quiz/publish?id=${id}`);

const quizApi = {
  list,
  create,
  show,
  update,
  destroy,
  publish,
};

export default quizApi;
