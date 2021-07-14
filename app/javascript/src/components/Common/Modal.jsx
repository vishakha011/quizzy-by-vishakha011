import React from "react";

const Modal = ({ setOpenModal, id, destroyQuiz }) => {
  return (
    <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
      <div className="z-50 relative p-3 mx-auto my-0 max-w-lg">
        <div className="bg-white rounded shadow-lg border flex flex-col overflow-hidden px-4 py-10">
          <div className="text-center">
            <span className="border-2 rounded-full p-2 text-red-500 font-extrabold border-red-500 text-xl ri-close-fill"></span>
          </div>
          <div className="text-center pt-6 pb-2 text-sm text-gray-700">
            Are you sure ?
          </div>
          <div className="text-center font-light text-gray-700 mb-4">
            Do you really want to delete this record? This process cannot be
            undone.
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-2 py-2 focus:outline-none mx-1"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-gray-200 rounded hover:bg-red-400 px-2 py-2 focus:outline-none mx-1"
              onClick={() => destroyQuiz(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
