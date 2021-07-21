import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, setOpenModal, showQuiz, editQuiz, setId }) => {
  return (
    <Table
      data={data}
      showQuiz={showQuiz}
      editQuiz={editQuiz}
      setOpenModal={setOpenModal}
      setId={setId}
    />
  );
};

export default ListQuiz;
