import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import PageLoader from "components/PageLoader";
import questionsApi from "apis/questions";

const EditQuestion = ({ history }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [fields, setFields] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [defaultValue, setDefaultValue] = useState(0);

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionsApi.show(id);
      const { question, options, correct_answer, quiz_id } =
        response.data.question;
      setQuestion(question);
      setQuizId(quiz_id);
      setFields(() => {
        options.map((obj, idx) => {
          if (idx >= 2) obj["deleteOption"] = true;
        });
        return options;
      });
      setCorrectAnswer(correct_answer);
      setDefaultValue(() => {
        let indexOfCorrectAnswer;
        options.map((obj, idx) => {
          if (obj.option == correct_answer) indexOfCorrectAnswer = idx;
        });
        return indexOfCorrectAnswer;
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);
      const response = await questionsApi.show(id);
      const { options } = response.data.question;

      let optionsAttributes = [];

      options.map((obj, idx) => {
        if (fields[idx] && fields[idx].id == obj.id)
          optionsAttributes.push({ id: obj.id, option: fields[idx].option });
        else optionsAttributes.push({ ...obj, _destroy: obj.id });
      });

      if (options.length < fields.length)
        optionsAttributes.push(...fields.slice(options.length));
      const isPresent = optionsAttributes.findIndex(
        element => element.option == correctAnswer && !element._destroy
      );

      if (isPresent == -1) {
        setCorrectAnswer(optionsAttributes[0].option);
      }

      await questionsApi.update(id, {
        question: {
          question,
          correct_answer:
            isPresent != -1 ? correctAnswer : optionsAttributes[0].option,
          quiz_id: quizId,
          options_attributes: optionsAttributes,
        },
      });
      setLoading(false);
      history.push(`/quiz/${quizId}/show`);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <QuestionForm
        question={question}
        fields={fields}
        loading={loading}
        defaultValue={defaultValue}
        setFields={setFields}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
        setCorrectAnswer={setCorrectAnswer}
      />
    </Container>
  );
};

export default EditQuestion;
