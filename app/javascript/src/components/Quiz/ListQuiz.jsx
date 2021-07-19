import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, setOpenModal, showQuiz, updateQuiz, setId }) => {
  return (
    <Table
      data={data}
      showQuiz={showQuiz}
      updateQuiz={updateQuiz}
      setOpenModal={setOpenModal}
      setId={setId}
    />
  );
};

export default ListQuiz;
