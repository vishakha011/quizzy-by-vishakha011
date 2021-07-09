import React from "react";
import Button from "components/Button";

import PropTypes from "prop-types";
const Container = ({ children }) => {
  return (
    <>
      <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* <div className="flex justify-between items-center max-w-5xl mx-auto py-8">
        <div className="mt-6">
          <h1 className="font-bold">List of Quizzes</h1>
        </div>
        <Button buttonText="Add new Quiz" />
      </div> */}
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
