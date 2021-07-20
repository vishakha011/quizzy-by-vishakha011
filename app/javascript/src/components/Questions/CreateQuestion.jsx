import React, { useState } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import questionsApi from "apis/questions";

const CreateQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { answer: "", deleteOption: false },
    { answer: "", deleteOption: false },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      let answersAttributes = [];
      options.map(option =>
        answersAttributes.push({ answer: option.answer })
      );
      await questionsApi.create({
        question: {
          question,
          correct_answer: correctAnswer,
          quiz_id: id,
          answers_attributes: answersAttributes,
        },
      });
      setLoading(false);
      history.push(`/quiz/${id}/show`);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <QuestionForm
        question={question}
        setQuestion={setQuestion}
        setCorrectAnswer={setCorrectAnswer}
        options={options}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuestion;
