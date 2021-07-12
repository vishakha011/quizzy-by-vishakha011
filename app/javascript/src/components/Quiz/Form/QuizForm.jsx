import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const QuizForm = ({
  type = "create",
  name,
  setName,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Quiz Name"
        placeholder="Science Quiz"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Quiz" : "Update Quiz"}
        loading={loading}
      />
    </form>
  );
};

export default QuizForm;
