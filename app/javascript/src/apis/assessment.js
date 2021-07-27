import axios from "axios";

const show = (slug, payload) => axios.post(`/show/${slug}`, payload);

const create = payload => axios.post(`/assessment`, payload);

const login = (slug, payload) => axios.post(`/attempt/${slug}`, payload);

const assessmentApi = {
  show,
  create,
  login,
};

export default assessmentApi;
