import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import PageLoader from "components/PageLoader";
import questionsApi from "apis/questions";

const EditQuestion = ({ history }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [defaultValue, setDefaultValue] = useState(0);

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionsApi.show(id);
      const { question, answers, correct_answer, quiz_id } =
        response.data.question;
      logger.info(response);
      setQuestion(question);
      setCorrectAnswer(correct_answer);
      setQuizId(quiz_id);
      setOptions(() => {
        answers.map((obj, idx) => {
          if (idx >= 2) obj["deleteOption"] = true;
        });
        return answers;
      });
      setDefaultValue(() => {
        let indexOfCorrectAnswer;
        answers.map((obj, idx) => {
          if (obj.answer == correct_answer) indexOfCorrectAnswer = idx;
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
      const { answers } = response.data.question;

      let answersAttributes = [];

      answers.map((obj, idx) => {
        if (options[idx] && options[idx].id == obj.id)
          answersAttributes.push({ id: obj.id, answer: options[idx].answer });
        else answersAttributes.push({ ...obj, _destroy: obj.id });
      });

      if (answers.length < options.length)
        answersAttributes.push(...options.slice(answers.length));
      const isPresent = answersAttributes.findIndex(
        element => element.answer == correctAnswer && !element._destroy
      );

      if (isPresent == -1) {
        setCorrectAnswer(answersAttributes[0].answer);
      }

      await questionsApi.update(id, {
        question: {
          question,
          correct_answer:
            isPresent != -1 ? correctAnswer : answersAttributes[0].answer,
          quiz_id: quizId,
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
        options={options}
        loading={loading}
        defaultValue={defaultValue}
        setOptions={setOptions}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
        setCorrectAnswer={setCorrectAnswer}
      />
    </Container>
  );
};

export default EditQuestion;
