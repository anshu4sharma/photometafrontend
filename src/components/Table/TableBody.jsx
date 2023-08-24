import React, { useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import moment from "moment/moment";
import axios from "axios";
import { toast } from "react-toastify";
const TableBody = (props) => {
  const {
    tableData,
    columns,
    onEditClick,
    onCheckboxChange,
    Active,
    isOrder,
    HandelButton,
    onOrderClick,
  } = props;
  const handleEdit = (data) => {
    onEditClick(data);
  };
  const handleOnChange = (data) => {
    onCheckboxChange(data);
  };
  return (
    <tbody>
      {tableData.length !== 0 ? (
        tableData.map((data, i) => {
          return (
            <tr key={i.toString()}>
              {columns.map((e) => {
                const activeVal = data.Active;
                let value = data[e.label];
                if (e.label === "") {
                  return (
                    <td
                      style={{ width: "15%" }}
                      className={
                        e.label === "Actions" ? "ActionsData" : e.label
                      }
                    >
                      <button
                        className="bg-danger text-light"
                        onClick={() => onEditClick(data["_id"])}
                      >
                        Remove
                      </button>
                    </td>
                  );
                } else if (e.label === "AmountPM") {
                  return (
                    <td
                      style={{ width: "15%" }}
                      className={
                        e.label === "Actions" ? "ActionsData" : e.label
                      }
                    >
                      {data["Amount"].toFixed(3) -
                        (data["Amount"].toFixed(3) * 2) / 100}{" "}
                      PM
                    </td>
                  );
                } else if (e.label === "Close") {
                  return (
                    <button
                      className="bg-danger text-light"
                      onClick={() => onEditClick(data["_id"])}
                    >
                      Close
                    </button>
                  );
                } else {
                  if (e.label === "img") {
                    return (
                      <td
                        style={{ width: "15%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        <img
                          src={data[e.label]}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </td>
                    );
                  }
                  if (e.label === "ReceiveDate") {
                    return (
                      <td
                        style={{ width: "15%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        {moment(data[e.label]).format("YYYY-MM-DD")}
                      </td>
                    );
                  }
                  if (e.label === "_id") {
                    return (
                      <td
                        style={{ width: "8%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        {i + 1}
                      </td>
                    );
                  } else if (
                    e.label === "createdAt" ||
                    e.label === "creractedtime"
                  ) {
                    return (
                      <td
                        key={i.toString()}
                        style={{ width: "15%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        {new Date(data[e.label]).toDateString()}
                      </td>
                    );
                  } else {
                    return e.label === "Amount" ? (
                      <td
                        style={{ width: "15%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        {data[e.label].toFixed(3)} ST
                      </td>
                    ) : e.label === "Status" ? (
                      <td
                        style={{ width: "15%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        {data[e.label] === true ? "open" : "close"}
                      </td>
                    ) : (
                      <td
                        style={{ width: "15%" }}
                        className={
                          e.label === "Actions" ? "ActionsData" : e.label
                        }
                      >
                        {data[e.label].toString()}
                      </td>
                    );
                  }
                }
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={columns.length}>
            <h3>No Data found</h3>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
