import React from "react";
import { isNil, isEmpty, either } from "ramda";

const PrimaryContainer = ({ heading, data }) => {
  if (either(isNil, isEmpty)(data)) {
    return <h1 className="text-xl leading-5 text-center">{heading} 😔</h1>;
  }
};

export default PrimaryContainer;
