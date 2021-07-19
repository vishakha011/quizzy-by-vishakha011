import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = true,
  setOptions,
  deleteOption = false,
}) => {
  return (
    <>
      <div className="md:flex md:items-center mt-6">
        <div className="md:w-2/6">
          {label && (
            <label className="block text-gray-500 text-sm font-medium md:text-left mb-1 md:mb-0 pr-4">
              {label}
            </label>
          )}
        </div>
        <div className="md:w-3/6">
          <div className="mt-1 rounded-md shadow-sm">
            <input
              type={type}
              required={required}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="block w-full px-3 py-2 placeholder-gray-400
            transition duration-150 ease-in-out border
            border-gray-300 rounded-md appearance-none
            focus:outline-none focus:shadow-outline-blue
            focus:border-blue-300 sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div className="md:w-1/6">
          {deleteOption && (
            <i
              className="ml-8 ri-subtract-line text-red-500 hover: shadow cursor-pointer"
              onClick={() =>
                setOptions(prevState =>
                  prevState.slice(0, prevState.length - 1)
                )
              }
            ></i>
          )}
        </div>
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
