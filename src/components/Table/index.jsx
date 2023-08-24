import axios from "axios";
import { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
const Table = (props) => {
  const {
    onEditClick,
    onDeleteClick,
    onCheckboxChange,
    Active,
    isOrder,
    HandelButton,
    dataget,
    onOrderClick,
    h
  } = props;

  return (
    <>
      <div
        className="table-responsive py-1"
        style={{
          minHeight: "100%",
          maxHeight: `${!h?"490px":"100%"}`,
          overflow: "scroll",
        }}
      >
        <table
          className="table table-bordered"
          style={{
            minWidth: "680px",
          }}
        >
          <TableHead
            columns={props?.columns}
            handleSorting={props?.handleSorting}
            sortable={props?.sortField}
          />
          <TableBody
            columns={props?.columns}
            tableData={props?.tableData}
            onEditClick={onEditClick}
            Active={Active === undefined ? !true : !Active}
            onDeleteClick={onDeleteClick}
            onCheckboxChange={onCheckboxChange}
            isOrder={isOrder}
            HandelButton={HandelButton}
            onOrderClick={onOrderClick}
          />
        </table>
      </div>
      {/* {props?.pagination()} */}
    </>
  );
};

export default Table;
