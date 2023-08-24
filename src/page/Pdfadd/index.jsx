import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Pdfadd() {
  const focusPoint = useRef(null);
  const [Data, setData] = useState({ img: "", Tital: "", pdf: "" });
  const [dataget, setdataget] = useState(false);
  const [upload, setupload] = useState(!false);
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
      url: `${process.env.REACT_APP_API_URL}api/customer/Admin/add-pdf`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data);
    setdataget(true)
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handleChange = (info) => {
    if (info.target.name === "IMG") {
      getBase64(info.target.files[0])
        .then((result) => {
          setData({ ...Data, img: result });
        })
        .catch((err) => {});
    } else if (info.target.name === "PDF") {
      getBase64(info.target.files[0])
        .then((result) => {
          setData({ ...Data, pdf: result });
        })
        .catch((err) => {});
    } else if (info.target.name === "Title") {
      setData({ ...Data, Tital: info.target.value });
    }
  };
  const clientsHead = [
    { name: "Received date", label: "creractedtime" },
    { name: "Tital", label: "Tital" },
    { name: "Action", label: "" },
  ];
  const columns = [
    {
      title: "Received date",
      dataIndex: "creractedtime",
    },
    {
      title: "Tital",
      dataIndex: "Tital",
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
          <b>Remove</b>
        </button>
      ),
    },
  ];
  const onEditClick = async (id) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/Admin/remove/${id}`,
      method: "GET",
      headers: headersList,
    };
    let response = await axios.request(reqOptions);
    getdata();
  };
  return (
    <div className="saidcontent p-3">
      <ToastContainer />
      <h4>Title</h4>
      <div class="mb-3">
        <input
          class="form-control"
          name="Title"
          ref={focusPoint}
          type="text"
          id="formFile"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <h4>IMG</h4>
      <div class="mb-3">
        <input
          class="form-control"
          ref={focusPoint}
          name="IMG"
          type="file"
          id="formFile"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <h4>Upload PDF</h4>
      <div class="mb-3">
        <input
          class="form-control"
          ref={focusPoint}
          type="file"
          name="PDF"
          id="formFile"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        type="submit"
        className="btn py-2 px-5"
        disabled={!upload}
        style={{ background: "#535454", color: "#fff", display: "flex" }}
        onClick={() => {
          let bodyContent = Data;
          let headersList = {
            Accept: "*/*",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("login"))["data"][
                "x-customer-token"
              ]
            }`,
            "Content-Type": "application/json",
          };
          let reqOptions = {
            url: `${process.env.REACT_APP_API_URL}api/customer/Admin/add-pdf`,
            method: "POST",
            headers: headersList,
            data: bodyContent,
          };
          setupload(!true);
          axios
            .request(reqOptions)
            .then(async (res) => {
              toast.success("Pdf upload successfully");
              getdata();
              setupload(true);
            })
            .catch(() => {
              toast.error("something went wrong plz try again");
              setupload(true);
            });
        }}
      >
        {!upload && (
          <div className="">
            <svg
              version="1.1"
              id="L2"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              style={{ width: "15px", marginRight: 5 }}
              enable-background="new 0 0 100 100"
            >
              <circle
                fill="none"
                stroke="#fff"
                stroke-width="4"
                stroke-miterlimit="10"
                cx="50"
                cy="50"
                r="48"
              />
              <line
                fill="none"
                stroke-linecap="round"
                stroke="#fff"
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
                stroke="#fff"
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
        )}
        Submit
      </button>

      <div className="col-12 py-3">
        {/* {alldata && (
          <Table
            tableData={alldata ? alldata : []}
            columns={clientsHead}
            onEditClick={onEditClick}
          />
        )} */}
        {alldata && (
          <Table
            columns={columns}
            loading={!dataget}
            dataSource={alldata.reverse()}
            size={"small"}
            scroll={{ x: "calc(600px + 50%)" }}
          />
        )}
      </div>
    </div>
  );
}

export default Pdfadd;
