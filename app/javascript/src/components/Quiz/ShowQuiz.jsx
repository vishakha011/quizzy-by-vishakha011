import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import PrimaryContainer from "components/PrimaryContainer";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import ListQuestions from "components/Questions/ListQuestions";
import quizApi from "apis/quiz";
import questionsApi from "apis/questions";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [name, setName] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const handleDeleteQuestion = async id => {
    try {
      await questionsApi.destroy(id);
      fetchQuizDetails();
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizApi.show(id);
      setQuiz(response.data.quiz);
      setName(response.data.quiz.name);
      setQuestions(response.data.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center mx-auto py-8">
        <div className="mt-6">
          <h1 className="font-semibold text-3xl px-2">{name}</h1>
        </div>
        <div className="pr-32 flex flex-row gap-4">
          <Button
            type="link"
            buttonText="Add Questions"
            path={`/question/${id}/create`}
            iconClass="ri-add-line"
            loading={loading}
          />
          {!either(isNil, isEmpty)(questions) && (
            <Button buttonText="Publish" />
          )}
        </div>
      </div>

      <PrimaryContainer
        heading="There are no questions in this quiz"
        data={questions}
      />
      {questions.map((obj, key) => (
        <ListQuestions
          question={obj.question}
          options={obj.options}
          key={key}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}
    </Container>
  );
};

export default ShowQuiz;
