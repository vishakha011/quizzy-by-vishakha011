import React, { useState } from "react";

import LoginForm from "components/Authentication/Form/LoginForm";
import Toastr from "components/Common/Toastr";
import authApi from "apis/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.login({ login: { email, password } });
      setLoading(false);
      Toastr.success("Logged in Successfully");
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
