import React from "react";
import Button from "components/Button";

const ListQuestions = ({ question, options, handleDeleteQuestion }) => {
  return (
    <div className="md:flex md:items-center mt-6 max-w-3xl">
      <div className="md:w-2/12 block text-sm font-medium md:text-left mb-1 md:mb-0 pr-4">
        <div className="flex flex-col">
          <p className="mb-1 text-gray-700">Question</p>
          {options.map((option, index) => (
            <p className="text-gray-500" key={index}>
              Option {index + 1}{" "}
            </p>
          ))}
        </div>
      </div>
      <div className="md:w-6/12">
        <div className="flex flex-col text-indigo-500">
          <p className="font-bold">{question.question}</p>
          {options.map(option => (
            <p className="flex flex-row" key={option.id}>
              {option.option}
              {option.option == question.correct_answer && (
                <span className="text-green-500 relative flex justify-center">
                  <i className="ri-checkbox-circle-fill pl-3 pr-1"></i> Correct
                  answer
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
      <div className="md:w-3/12">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              type="link"
              buttonText="Edit"
              path={`/question/${question.id}/edit`}
              iconClass="ri-pencil-line"
            />
          </div>
          <div>
            <Button
              buttonText="Delete"
              buttonColor="red"
              iconClass="ri-delete-bin-line"
              onClick={() => handleDeleteQuestion(question.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListQuestions;
