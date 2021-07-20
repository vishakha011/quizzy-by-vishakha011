import React from "react";
import Select from "react-select";

import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  question,
  setQuestion,
  setCorrectAnswer,
  options,
  setOptions,
  loading,
  defaultValue = 0,
  handleSubmit,
}) => {
  const handleSetOptions = (event, index) => {
    event.preventDefault();
    const data = [...options];
    data[index].answer = event.target.value;

    setOptions(data);
  };

  const selectCorrectAnswer = [];
  options.forEach((option, index) =>
    selectCorrectAnswer.push({
      value: index,
      label: `Option ${index + 1}`,
    })
  );

  const defaultOption = {
    value: defaultValue,
    label: `Option ${defaultValue + 1}`,
  };

  return (
    <form className="max-w-lg mt-12" onSubmit={handleSubmit}>
      <Input
        label="Question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <>
          <Input
            label={`Option ${index + 1}`}
            value={option.answer}
            deleteOption={option.deleteOption}
            onChange={e => handleSetOptions(e, index)}
            setOptions={setOptions}
          />
        </>
      ))}

      {options.length < 4 && (
        <div className="md:flex md:items-center mt-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <p
              className="text-blue-500 underline cursor-pointer"
              onClick={() =>
                setOptions(prevState => [
                  ...prevState,
                  { answer: "", deleteOption: true },
                ])
              }
            >
              <i className={`ri-add-line`}></i>&nbsp;Add Option
            </p>
          </div>
        </div>
      )}

      <div className="md:flex md:items-center mt-6">
        <p className="md:w-2/6 block text-gray-500 text-sm font-medium md:text-left mb-1 md:mb-0 pr-4">
          Correct Answer:{" "}
        </p>
        <div className="w-3/6">
          <Select
            options={selectCorrectAnswer}
            defaultValue={defaultOption}
            onChange={e => setCorrectAnswer(options[e.value].answer)}
            isSearchable
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div>
          <Button type="submit" buttonText={"Submit"} loading={loading} />
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
