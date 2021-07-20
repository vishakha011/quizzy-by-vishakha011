import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  type = "button",
  buttonText,
  buttonColor = "indigo",
  onClick,
  iconClass,
  path = "",
  loading,
}) => {
  if (type === "link") {
    return (
      <>
        <div className="mt-6">
          <Link
            to={path}
            className={`flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-300 ease-in-out border border-transparent rounded-md group hover:bg-opacity-90 focus:outline-none bg-${buttonColor}-500`}
          >
            {iconClass ? <i className={`${iconClass} text-xl pr-1`}></i> : " "}
            {buttonText}
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="mt-6">
      <button
        type={type}
        onClick={onClick}
        className={`flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-300 ease-in-out border border-transparent rounded-md group hover:bg-opacity-90 focus:outline-none bg-${buttonColor}-500`}
      >
        {iconClass ? <i className={`${iconClass} text-xl pr-1`}></i> : " "}
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;
