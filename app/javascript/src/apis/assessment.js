import axios from "axios";

const show = (slug, payload) => axios.get(`/assessment/${slug}`, payload);

const create = payload => axios.post(`/assessment`, payload);

const assessmentApi = {
  show,
  create,
};

export default assessmentApi;
