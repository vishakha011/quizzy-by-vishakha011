import React from "react";

import PropTypes from "prop-types";
const Container = ({ children }) => {
  return (
    <>
      <div className="container mx-auto px-4 py-2 mt-3 sm:px-6 lg:px-8">
        <div className="max-w mx-auto">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
