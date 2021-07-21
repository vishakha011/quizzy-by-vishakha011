import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PrimaryContainer from "components/PrimaryContainer";
import ListQuiz from "components/Quiz/ListQuiz";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import Modal from "components/Common/Modal";
import quizApi from "apis/quiz";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

  const fetchQuiz = async () => {
    try {
      const response = await quizApi.list();
      setQuizzes(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const showQuiz = id => {
    history.push(`quiz/${id}/show`);
  };

  const editQuiz = id => {
    history.push(`/quiz/${id}/edit`);
  };

  const destroyQuiz = async id => {
    try {
      await quizApi.destroy(id);
      setOpenModal(false);
      setId(null);
      await fetchQuiz();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
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
            <h1 className="font-bold text-xl px-2">List of Quizzes</h1>
          </div>
          <Button
            type="link"
            buttonText="Add new Quiz"
            path={"/quiz/create"}
            iconClass="ri-add-line"
            loading={loading}
          />
        </div>
        <ListQuiz
          data={quizzes}
          showQuiz={showQuiz}
          editQuiz={editQuiz}
          setOpenModal={setOpenModal}
          setId={setId}
        />
        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            destroyQuiz={destroyQuiz}
            id={id}
          />
        )}
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
      <PrimaryContainer
        heading="You have not created any quiz"
        data={quizzes}
      />
    </Container>
  );
};

export default Dashboard;
