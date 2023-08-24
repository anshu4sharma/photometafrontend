import React, { useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function AdminSupport() {
  const [dataget, setdataget] = useState(false);
  const [alldata, setalldata] = useState([]);
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/all-ticket-admin`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data.reverse());
    setdataget(true);
  };

  const onEditClick = async (id) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/get-ticket/${id}`,
      method: "GET",
      headers: headersList,
    };
    await axios.request(reqOptions);
    getdata();
  };
  const columns = [
    {
      title: "Tickets Id",
      dataIndex: "_id",
      render: (text) => <p>{text.toString()}</p>,
    },
    {
      title: "username",
      dataIndex: "result",
      render: (text) => <p>{text[0].username.toString()}</p>,
    },
    {
      title: "email",
      dataIndex: "result",
      render: (text) => <p>{text[0].email.toString()}</p>,
    },
    {
      title: "Description of issue",
      dataIndex: "description",
    },
    {
      title: "Attachment",
      dataIndex: "img",
      render: (text) =>
        text ? (
          <img src={text} alt="" width={45} height={45} className="d-block" />
        ) : (
          "Null"
        ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text) => <p>{text.toString()}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (text) => (
        <button
          className="bg-danger text-light px-4 py-2 mb-3"
          style={{
            border: "none",
            borderRadius: "8px",
          }}
          onClick={() => onEditClick(text)}
        >
          <b>close</b>
        </button>
      ),
    },
    {
      title: "Date",
      dataIndex: "creractedtime",
    },
  ];
  return (
    <div className="saidcontent pt-4">
      <ToastContainer />
      <div className="mx-3">
        <h3>Ticket details</h3>

        <div className="px-3 pt-3">
          <div className="d-flex py-3 align-items-center">
            <h6 className="m-0 pe-3">Tickets details :</h6>
            <input
              type="text"
              onChange={(e) => {
                if (e.target.value !== "") {
                  let filteredList = alldata.filter(
                    (job) =>
                      job.description
                        .toString()
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      job.Status.toString()
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                  );
                  setalldata(filteredList);
                } else {
                  getdata();
                }
              }}
            />
          </div>
        </div>
        {alldata && (
          <Table
            columns={columns}
            loading={!dataget}
            dataSource={alldata}
            size={"small"}
            scroll={{ x: "calc(600px + 50%)" }}
          />
        )}
      </div>
    </div>
  );
}

export default AdminSupport;
