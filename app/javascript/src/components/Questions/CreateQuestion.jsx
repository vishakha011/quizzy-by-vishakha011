import React, { useState } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import questionsApi from "apis/questions";

const CreateQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [fields, setFields] = useState([
    { option: "", deleteOption: false },
    { option: "", deleteOption: false },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      let optionsAttributes = [];
      fields.map(field => optionsAttributes.push({ option: field.option }));
      await questionsApi.create({
        question: {
          question,
          correct_answer: correctAnswer,
          quiz_id: id,
          options_attributes: optionsAttributes,
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
        fields={fields}
        setFields={setFields}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuestion;
