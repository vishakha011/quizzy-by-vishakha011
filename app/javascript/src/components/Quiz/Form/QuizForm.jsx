import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const QuizForm = ({
  type = "create",
  name,
  setName,
  loading,
  handleSubmit
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Quiz Name"
        placeholder="Science Quiz"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <Button
            type="submit"
            buttonText={type === "create" ? "Create Quiz" : "Update Quiz"}
            loading={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default QuizForm;
