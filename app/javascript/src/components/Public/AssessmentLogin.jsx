import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import LoginForm from "./LoginForm";
import QuizAssessment from "./QuizAssessment";
import assessmentApi from "apis/assessment";

const AssessmentLogin = ({ history }) => {
  const { slug } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const [renderQuiz, setRenderQuiz] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <h1 className="text-2xl font-bold text-indigo-700 capitalize pt-8 pl-20">
        Welcome to {slug}
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
        />
      )}

      {renderQuiz && <QuizAssessment slug={slug} />}
    </Container>
  );
};

export default AssessmentLogin;
