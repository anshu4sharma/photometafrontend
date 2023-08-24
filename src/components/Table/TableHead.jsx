import React, { useState } from "react";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { TbArrowsDownUp } from "react-icons/tb";

const TableHead = (props) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const handleSortingChange = (accessor) => {
    if (
      accessor !== "Actions" &&
      accessor !== "LastModifiedBy" &&
      accessor !== "LastModifiedDate"
    ) {
      const sortOrder =
        accessor === sortField && order === "asc" ? "desc" : "asc";
      setSortField(accessor);
      setOrder(sortOrder);
      props.handleSorting(accessor, sortOrder);
    }
  };
  return (
    <thead>
      <tr className="tblHeadRow">
        {props.columns.map((data, i) => {
          const cl = props.sortable
            ? sortField === data.label && order === "asc"
              ? "up"
              : sortField === data.label && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              onClick={() => handleSortingChange(data.label)}
              style={{
                background: "rgba(217, 217, 217, 0.96)",
              }}
              // className={`${cl}  ${data.label !== 'StatusId' && data.label !== 'SrNo' ? data.label === 'Actions' ? 'ActionsCenter' : 'tblHeading' : 'SrNoCenter'}`}
              key={i.toString()}
            >
              <div className="">{data.name}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
