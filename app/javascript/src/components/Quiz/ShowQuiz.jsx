import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import PrimaryContainer from "components/PrimaryContainer";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import quizApi from "apis/quiz";

const ShowQuiz = () => {
  const { id } = useParams();
  const [name, setName] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizApi.show(id);
      setName(response.data.quiz.name);
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
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center max-w-5xl mx-auto py-8">
        <div className="mt-6">
          <h1 className="font-bold text-xl px-2">{name}</h1>
        </div>
        <Button
          type="link"
          buttonText="Add Questions"
          path={`/quiz/create/question/${id}`}
          iconClass="ri-add-line"
          loading={loading}
        />
      </div>

      <PrimaryContainer
        heading="There are no questions in this quiz"
        data={questions}
      />
    </Container>
  );
};

export default ShowQuiz;
