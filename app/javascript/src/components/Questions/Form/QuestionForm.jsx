import React from "react";
import Select from "react-select";

import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  question,
  setQuestion,
  setCorrectAnswer,
  fields,
  setFields,
  loading,
  defaultValue = 0,
  handleSubmit,
}) => {
  const selectCorrectAnswer = [];
  fields.forEach((field, index) =>
    selectCorrectAnswer.push({
      value: index,
      label: `Option ${index + 1}`,
    })
  );

  const defaultOption = {
    value: defaultValue,
    label: `Option ${defaultValue + 1}`,
  };

  const handleSetOptions = (value, idx) => {
    setFields(preState => {
      const curState = [...preState];
      curState[idx].option = value;
      setCorrectAnswer(curState[0].option);
      return curState;
    });
  };

  return (
    <form className="max-w-lg mt-12" onSubmit={handleSubmit}>
      <Input
        label="Question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {fields.map((field, index) => (
        <>
          <Input
            key={index}
            label={`Option ${index + 1}`}
            value={field.option}
            deleteOption={field.deleteOption}
            onChange={e => handleSetOptions(e.target.value, index)}
            setFields={setFields}
          />
        </>
      ))}

      {fields.length < 4 && (
        <div className="md:flex md:items-center mt-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <p
              className="text-blue-500 underline cursor-pointer"
              onClick={() =>
                setFields(prevState => [
                  ...prevState,
                  { option: "", deleteOption: true },
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
            onChange={e => setCorrectAnswer(fields[e.value].option)}
            isSearchable
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div>
          <Button type="submit" buttonText="Submit" loading={loading} />
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
