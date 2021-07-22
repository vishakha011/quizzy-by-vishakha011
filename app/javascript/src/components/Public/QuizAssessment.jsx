import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLoader from "components/PageLoader";
import assessmentApi from "apis/assessment";

const QuizAssessment = () => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizDetails = async () => {
    try {
      const response = await assessmentApi.show(slug);
      setQuiz(response.data.quiz.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return <div></div>;
};

export default QuizAssessment;
