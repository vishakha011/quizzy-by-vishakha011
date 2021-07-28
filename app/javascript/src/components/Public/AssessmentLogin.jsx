import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import LoginForm from "./LoginForm";
import QuizAssessment from "./QuizAssessment";
import assessmentApi from "apis/assessment";
import quizApi from "apis/quiz";

const AssessmentLogin = ({ history }) => {
  const { slug } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const [quizName, setQuizName] = useState("");
  const [renderQuiz, setRenderQuiz] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await assessmentApi.login(slug, {
        user: { first_name: firstName, last_name: lastName, email }
      });
      setUser(response.data);
      setRenderQuiz(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await assessmentApi.show(slug, {
        user: { id }
      });
      setQuizName(response.data.quiz.name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <Container>
      <h1 className="text-2xl font-bold text-indigo-700 capitalize pt-8 pl-20">
        Welcome to {quizName}
      </h1>
      {!renderQuiz && (
        <LoginForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      )}

      {renderQuiz && (
        <QuizAssessment
          slug={slug}
          history={history}
          userId={user.user.id}
          attempted={user.is_attempted}
          setSubmitted={setSubmitted}
          submitted={submitted}
        />
      )}
    </Container>
  );
};

export default AssessmentLogin;
