import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import ListQuiz from "components/Quiz/ListQuiz";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import quizApi from "apis/quiz";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await quizApi.list();
      setQuizzes(response.data.quizzes);
      // logger.info(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const updateQuiz = id => {
    history.push(`/quiz/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(quizzes)) {
    return (
      <Container>
        <div className="flex justify-between items-center max-w-5xl mx-auto py-8">
          <div className="mt-6">
            <h1 className="font-bold">List of Quizzes</h1>
          </div>
          <Button
            type="link"
            buttonText="Add new Quiz"
            path={"/quiz/create"}
            iconClass="ri-add-line"
            loading={loading}
          />
        </div>
        <ListQuiz data={quizzes} updateQuiz={updateQuiz} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-end items-center max-w-5xl mx-auto py-8 flex-row">
        <Button
          type="link"
          buttonText="Add new Quiz"
          path={"/quiz/create"}
          iconClass="ri-add-line"
          loading={loading}
        />
      </div>
      <h1 className="text-xl leading-5 text-center">
        You have not created any quiz 😔
      </h1>
    </Container>
  );
};

export default Dashboard;
