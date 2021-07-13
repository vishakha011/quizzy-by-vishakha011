import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuizForm from "components/Quiz/Form/QuizForm";
import PageLoader from "components/PageLoader";
import quizApi from "apis/quiz";

const EditQuiz = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizApi.update(id, { quiz: { name } });
      history.push("/");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizApi.show(id);
      setName(response.data.quiz.name);
      logger.info(response.data.quiz.name);
    } catch (error) {
      Logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <QuizForm
        type="update"
        name={name}
        setName={setName}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditQuiz;
