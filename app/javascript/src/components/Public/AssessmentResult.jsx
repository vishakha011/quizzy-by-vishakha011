import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import assessmentApi from "apis/assessment";

const AssessmentResult = () => {
  const { slug } = useParams();
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchQuizDetails = async () => {
    try {
      const response = await assessmentApi.show(slug, {
        user: { id },
      });
      setQuiz(response.data);
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

  return (
    <Container>
      {!either(isNil, isEmpty)(quiz) && (
        <>
          <h1>
            Thank you for taking the quiz, here are your results. You
            <br /> have submitted {quiz.attempted.correct_answers} correct and{" "}
            {quiz.attempted.wrong_answers} incorrect answers{" "}
          </h1>
          <form className="flex flex-col my-2">
            {quiz.questions.map((obj, index) => (
              <div className="flex flex-row gap-24 my-6" key={index}>
                <div className="text-gray-700">Question {index + 1}</div>
                <div className="flex flex-col">
                  <p className="text-back-500 font-medium">
                    {obj.question.question}
                  </p>
                  {obj.options.map((ele, idx) => (
                    <label className="inline-flex items-center mt-3" key={idx}>
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-gray-600"
                        name={obj.question.question}
                        value={ele.id}
                        checked={ele.id == quiz.results[index].option_id}
                        disabled
                      />
                      <span className="ml-2 text-black-700 flex flex-row">
                        {ele.option}
                        {ele.option == obj.question.correct_answer && (
                          <span className="text-green-500 relative flex justify-center">
                            <i className="ri-checkbox-circle-fill px-3"></i>{" "}
                            Correct answer
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </form>
        </>
      )}
    </Container>
  );
};

export default AssessmentResult;
