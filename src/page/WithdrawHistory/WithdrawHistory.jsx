import { Table } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import Table from "../../components/Table";

function WithdrawHistory() {
  const [alldata, setalldata] = useState([]);
  const [dataget, setdataget] = useState(false);
  const [upload, setupload] = useState(!false);
  useEffect(() => {
    getdata();
  }, []);
  const clientsHead = [
    { name: "withdrawal Date", label: "createdAt" },
    { name: "ST", label: "Amount" },
    { name: "PM", label: "AmountPM" },
    { name: "Startus", label: "Remark" },
  ];
  const columns = [
    {
      title: "withdrawal Date",
      dataIndex: "createdAt",
      width: "30%",
      render: (text) => <p className="m-0">{new Date(text).toDateString()}</p>,
    },
    {
      title: "ST",
      dataIndex: "Amount",
      width: "15%",
      render: (text) => (
        <p className="m-0">
          {Number(text).toFixed(3)}
          {" ST"}
        </p>
      ),
    },
    {
      title: "PM-V2",
      dataIndex: "Amount",
      width: "15%",
      render: (text, record, index) => {
        return (
          <p className="m-0">
            {/* {record.PM
            ? record.PM */}
            {record?.PM
              ? record?.PM
              : Number(record?.Amount - (record?.Amount * 2) / 100).toFixed(3)}
            {" PM"}
          </p>
        );
      },
    },

    {
      title: "Startus",
      dataIndex: "Remark",
      width: "40%",
    },
  ];
  const getdata = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/withdrawal-amount`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data.data.reverse());
    setdataget(true);
  };
  return (
    <div className="saidcontent pt-4">
      <div className="container-fluid px-4">
        <div className="row">
          {!upload ? (
            <div className="d-block m-auto text-center py-5">
              <svg
                version="1.1"
                id="L2"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                style={{ width: "45px", marginRight: 5 }}
                enable-background="new 0 0 100 100"
              >
                <circle
                  fill="none"
                  stroke="#000"
                  stroke-width="4"
                  stroke-miterlimit="10"
                  cx="50"
                  cy="50"
                  r="48"
                />
                <line
                  fill="none"
                  stroke-linecap="round"
                  stroke="#000"
                  stroke-width="4"
                  stroke-miterlimit="10"
                  x1="50"
                  y1="50"
                  x2="85"
                  y2="50.5"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="2s"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  fill="none"
                  stroke-linecap="round"
                  stroke="#000"
                  stroke-width="4"
                  stroke-miterlimit="10"
                  x1="50"
                  y1="50"
                  x2="49.5"
                  y2="74"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="15s"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>
            </div>
          ) : (
            <>
              <h1 className="mb-4">Withdraw History</h1>
              <Table
                columns={columns}
                loading={!dataget}
                dataSource={alldata}
                size={"small"}
                scroll={{ x: "calc(500px + 50%)" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WithdrawHistory;
