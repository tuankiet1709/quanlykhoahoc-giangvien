import React from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import "../../styles/Table.css";

import Paging, { PageType } from "./Paging";

const ColumnIcon = ({ colValue, sortState }) => {
  if (colValue === sortState.columnValue && sortState.orderBy === "desc")
    return <CaretUpFill />;

  return <CaretDownFill />;
};

const Table = ({
  columns,
  children,
  page,
  sortState,
  handleSort,
}) => {
  //console.log(page)

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text center text-lg-nowrap">
              {columns.map((col, i) => (
                <th key={i}>
                  {col.columnValue != "" && (
                    <div className="d-flex align-items-center">
                      <a
                        className="btn"
                        onClick={() => handleSort(col.columnValue)}
                      >
                        {col.columnName}
                      </a>
                      <ColumnIcon
                        colValue={col.columnValue}
                        sortState={sortState}
                      />
                    </div>
                  )}
                  {col.columnValue == "" && col.columnName != "" && (
                    <div className="d-flex align-items-center">
                      <a
                        className="btn"
                      >
                        {col.columnName}
                      </a>
                    </div>
                  )}
                  {col.columnValue == "" && col.columnName == "" && (
                    <div className="d-flex">
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>

      {!!(page && page.totalPage && page.totalPage >= 1) && (
        <Paging {...page} />
      )}
      {/* {!!!(page && page.totalPage && page.totalPage >= 1) && (
        <p className="text-center">No record</p>
      )} */}
    </>
  );
};

export default Table;
