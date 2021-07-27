import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const LoginForm = ({
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
  loading,
  handleSubmit,
}) => {
  return (
    <div
      className="flex items-center justify-center
    px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            type="text"
            placeholder="Eve"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="eve@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <Button type="submit" buttonText="Submit" loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
