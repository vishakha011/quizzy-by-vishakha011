import React, { useState } from "react";
import Container from "components/Container";
import QuizForm from "components/Quiz/Form/QuizForm";
import quizApi from "apis/quiz";

const CreateQuiz = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizApi.create({ quiz: { name } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <QuizForm
        name={name}
        setName={setName}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuiz;
