import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, setOpenModal, updateQuiz, setId }) => {
  return (
    <Table
      data={data}
      updateQuiz={updateQuiz}
      setOpenModal={setOpenModal}
      setId={setId}
    />
  );
};

export default ListQuiz;
