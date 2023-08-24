import { Col, Input, Table } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import Table from "../../components/Table";
import Text from "antd/lib/typography/Text";

function AvatarbuyUsers() {
  const [alldata, setalldata] = useState([]);
  const [dataget, setdataget] = useState(false);
  const [alldata1, setalldata1] = useState([]);
  const [alldata2, setalldata2] = useState([]);
  const [Fillter, setFillter] = React.useState([]);
  const [dataget1, setdataget1] = useState(false);
  const [a, seta] = useState(false);
  useEffect(() => {
    getdata1();
  }, []);
  const columns1 = [
    {
      title: "User Name",
      dataIndex: "result",
      render: (text) => (
        <p className="m-0">{text.length > 0 ? text[0].username : "-"}</p>
      ),
    },
    {
      title: "Email",
      dataIndex: "result",
      render: (text) => (
        <p className="m-0">{text.length > 0 ? text[0].email : "-"}</p>
      ),
    },
    {
      title: "Avatar Name",
      dataIndex: "name",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "Avatar Price",
      dataIndex: "price",
      render: (text) => <p className="m-0">{text}$</p>,
    },
    {
      title: "createdAt",
      dataIndex: "creractedtime",
      render: (text) => <p className="m-0">{new Date(text).toDateString()}</p>,
    },
    {
      title: "IpAddress",
      dataIndex: "ipAddress",
      width: "15%",
      render: (text) => <p className="m-0">{text ? text : "-"}</p>,
    },
    {
      title: "Withdrawal",
      dataIndex: "result",
      render: (text) => (
        <button
          style={{
            width: 165,
            boxShadow: "none !important",
            fontSize: "16px !important",
            fontWeight: 600,
            textAlign: "center",
            justifyContent: "center",
          }}
          className="btn11 btn"
          onClick={async () => {
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
              url: `${process.env.REACT_APP_API_URL}api/customer/withdrawal/${
                text.length > 0 ? text[0]?._id : 0
              }`,
              method: "GET",
              headers: headersList,
            };

            let response = await axios.request(reqOptions);
            setalldata2(response?.data.data.reverse());
            seta(true);
          }}
        >
          withdrawal history
        </button>
      ),
    },
  ];
  const columns2 = [
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
      title: "PM-v2",
      dataIndex: "Amount",
      width: "15%",
      render: (text) => (
        <p className="m-0">
          {Number(text - (text * 2) / 100).toFixed(3)}
          {" PM-v2"}
        </p>
      ),
    },
    {
      title: "IpAddress",
      dataIndex: "ipAddress",
      width: "15%",
      render: (text) => <p className="m-0">{text ? text : "-"}</p>,
    },
    {
      title: "Startus",
      dataIndex: "Remark",
      width: "40%",
    },
  ];
  const getdata1 = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/buyavtarsuser`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata1(response?.data.data);
    setFillter(response?.data.data.reverse());
    setdataget1(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = alldata1.filter((truck) => {
        return (
          (truck.result.length > 0 &&
            truck.result[0]?.username?.toString().toLowerCase().match(value)) ||
          truck.result[0]?.email?.toString().toLowerCase().match(value) ||
          truck?.ipAddress?.toString().toLowerCase().match(value) ||
          truck?.name?.toString().toLowerCase().match(value) ||
          truck?.price?.toString().toLowerCase().match(value)
        );
      });
      setFillter(data);
    } else {
      getdata1();
    }
  };
  console.log(alldata2);
  return (
    <div className="saidcontent pt-4">
      <div className="container-fluid px-4">
        <div className="row">
          {!a ? (
            <>
              <h3 className="mb-4">Avatar buy Users</h3>
              <Col className="pt-0 p-3" xs={24} lg={15}>
                <div className="">
                  <Text>Source</Text>
                  <br />
                  <Input
                    showSearch
                    style={{ width: "100%", maxWidth: "300px" }}
                    placeholder="Search"
                    name="serch"
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Table
                columns={columns1}
                dataSource={Fillter}
                size={"small"}
                scroll={{ x: "calc(500px + 50%)" }}
              />
            </>
          ) : (
            <>
              <button
                className="btn11 btn  d-flex ms-auto my-4 me-3"
                style={{
                  width: 100,
                  boxShadow: "none !important",
                  fontSize: "16px !important",
                  background: "#eeeeee !important",
                  fontWeight: 600,
                  textAlign: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  seta(false);
                }}
              >
                Back
              </button>
              <Table
                columns={columns2}
                dataSource={alldata2}
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

export default AvatarbuyUsers;
