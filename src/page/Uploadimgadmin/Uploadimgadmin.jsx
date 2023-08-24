import { Table } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Uploadimgadmin = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataget, setdataget] = useState(false);
  const [data1, setdata1] = useState([]);
  const [upload, setupload] = useState(!false);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  useEffect(() => {
    getdata();
  }, []);
  const data = [];
  for (let i = 0; i < data1.length; i++) {
    data.push({
      key: i,
      creractedtime: data1[i].creractedtime,
      _id: data1[i]._id,
      username: data1[i].username,
      email: data1[i].email,
      img1: data1[i].img,
      img2: data1[i].img1,
      result: data1[i].result,
      Price: data1[i].Price,
      Name: data1[i].Name,
    });
  }
  const columns = [
    {
      title: "User name",
      dataIndex: "username",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "email",
      dataIndex: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Picture-1",
      dataIndex: "img1",
      render: (text) =>
        text ? <img src={text} alt="" width={80} height={80} /> : "Null",
    },
    {
      title: "Picture-2",
      dataIndex: "img2",
      render: (text) =>
        text ? <img src={text} alt="" width={80} height={80} /> : "Null",
    },
    {
      title: "Avatar Name",
      dataIndex: "Name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Avatar Price",
      dataIndex: "Price",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "creractedtime",
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
      url: `${process.env.REACT_APP_API_URL}api/customer/img-all-upload`,
      method: "GET",
      headers: headersList,
    };
    let response = await axios.request(reqOptions);
    // console.log(response?.data.data);
    setdata1(response?.data.data);
    setdataget(!false);
    setupload(!false);
  };
  return (
    <div className="saidcontent p-3">
      <ToastContainer />
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
          <button
            className="bg-danger text-light px-4 py-2 mb-3"
            style={{
              border: "none",
              borderRadius: "8px",
            }}
            onClick={async () => {
              setupload(false);
              let bodyContent = {
                data: selectedRowKeys,
              };
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
                url: `${process.env.REACT_APP_API_URL}api/customer/img-Removeall-upload`,
                method: "POST",
                data: bodyContent,
                headers: headersList,
              };
              await axios
                .request(reqOptions)
                .then((r) => {
                  getdata();
                  toast.success("Picture Delete successfully");
                })
                .catch(() => {
                  toast.success("error");
                });
            }}
          >
            Delete
          </button>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            size={"small"}
            dataSource={data}
            loading={!dataget}
            scroll={{ x: "calc(600px + 50%)", y: 700 }}
          />
        </>
      )}
    </div>
  );
};
export default Uploadimgadmin;
