import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, updateQuiz }) => {
  return <Table data={data} updateQuiz={updateQuiz} />;
};

export default ListQuiz;
