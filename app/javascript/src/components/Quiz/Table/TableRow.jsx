import React, { Fragment } from "react";
import PropTypes from "prop-types";

const TableRow = ({
  data,
  getTableBodyProps,
  rows,
  prepareRow,
  updateTask,
}) => {
  return (
    <tbody
      className="bg-white divide-y divide-gray-200"
      {...getTableBodyProps()}
    >
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            key={row.original.id}
            className="hover:bg-gray-100"
          >
            {row.cells.map((cell, idx) => {
              return (
                <>
                  <Fragment key={idx}>
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-sm font-medium leading-5 text-bb-gray whitespace-no-wrap"
                    >
                      {cell.render("Cell")}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
                      <a
                        className="text-bb-purple text-opacity-50
                        hover:text-opacity-100"
                      >
                        Edit
                      </a>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
                      <a className=" hover:text-bb-red">Delete</a>
                    </td>
                  </Fragment>
                </>
              );
            })}
          </tr>
        );
      })}
    </tbody>

  // <tbody
  //   className="bg-white divide-y divide-gray-200"
  //   {...getTableBodyProps()}
  // >
  //   {data.map(rowData => (
  //     <tr key={rowData.id}>
  //       <td
  //         className="px-6 py-4 text-sm font-medium
  //         leading-5 text-bb-gray whitespace-no-wrap"
  //       >
  //         {rowData.name}
  //       </td>
  //       <td
  //         className="px-6 py-4 text-sm font-medium
  //         leading-5 text-right cursor-pointer"
  //       >
  //         <a
  //           className="text-bb-purple text-opacity-50
  //           hover:text-opacity-100"
  //         >
  //           Edit
  //         </a>
  //       </td>
  //       <td
  //         className="px-6 py-4 text-sm font-medium
  //         leading-5 text-right cursor-pointer"
  //       >
  //         <a className=" hover:text-bb-red">Delete</a>
  //       </td>
  //     </tr>
  //   ))}
  // </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyTask: PropTypes.func,
  updateTask: PropTypes.func,
};

export default TableRow;
