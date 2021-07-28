import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isNil, isEmpty, either } from "ramda";

import PageLoader from "components/PageLoader";
import Container from "components/Container";
import Button from "components/Button";
import assessmentApi from "apis/assessment";

const QuizAssessment = ({
  slug,
  attempted,
  submitted,
  setSubmitted,
  userId,
  history
}) => {
  const [quiz, setQuiz] = useState({});
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      let correctAnswers = 0;
      quiz.questions.map((obj, index) => {
        obj.options.map(ele => {
          if (
            ele.option == obj.question.correct_answer &&
            ele.id == options[index].option_id
          )
            correctAnswers += 1;
        });
      });
      const wrongAnswers = quiz.questions.length - correctAnswers;
      setSubmitted(true);
      await assessmentApi.create({
        assessment: {
          quiz_id: quiz.quiz.id,
          user_id: userId,
          submitted: true,
          correct_answers: correctAnswers,
          wrong_answers: wrongAnswers,
          attempt_answers_attributes: options
        }
      });
      history.push(`/public/${slug}/result/${userId}`);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const handleOption = (questionId, answerId) => {
    setOptions(state => {
      const object = { question_id: questionId, option_id: answerId };
      const index = state.findIndex(
        element => element.question_id == questionId
      );
      if (index >= 0) {
        state[index] = object;
      } else return [...state, object];
    });
  };

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await assessmentApi.show(slug, { user: { id: userId } });
      setQuiz(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!attempted) fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  if (attempted) {
    return (
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center mt-32">
          <h1 className="text-lg leading-5">
            You have already attempted this quiz!!
          </h1>
          <Link
            to={`/public/${slug}/result/${userId}`}
            className="text-md font-semibold text-blue-500 leading-5 underline mt-4"
          >
            View Result
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Container>
      {!either(isNil, isEmpty)(quiz) && (
        <form className="flex flex-col my-2" onSubmit={handleSubmit}>
          {quiz.questions.map((obj, idx) => (
            <div className="flex flex-row gap-24 my-6" key={idx}>
              <div className="text-gray-700">Question {idx + 1}</div>
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
                      onChange={() => handleOption(obj.question.id, ele.id)}
                      required
                    />
                    <span className="ml-2 text-black-700">{ele.option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="ml-40">
            <Button type="submit" buttonText={"Submit"} />
          </div>
        </form>
      )}
    </Container>
  );
};

export default QuizAssessment;
