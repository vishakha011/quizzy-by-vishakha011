import axios from "axios";

const login = payload =>
  axios.post("/sessions", payload, { withCredentials: true });

const isLoggedIn = () => axios.get("/sessions", { withCredentials: true });

const logout = () => axios.delete("/sessions", { withCredentials: true });

const authApi = {
  login,
  isLoggedIn,
  logout,
};

export default authApi;
