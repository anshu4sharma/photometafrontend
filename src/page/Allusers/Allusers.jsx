import { Col, Input, Table } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import Table from "../../components/Table";
import Text from "antd/lib/typography/Text";

function Allusers() {
  const [alldata, setalldata] = useState([]);
  const [dataget, setdataget] = useState(false);
  const [Fillter, setFillter] = React.useState([]);
  const [alldata1, setalldata1] = useState([]);
  const [dataget1, setdataget1] = useState(false);
  const [upload, setupload] = useState(!false);
  useEffect(() => {
    getdata();
  }, []);
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "Refferal Id",
      dataIndex: "refferalId",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "RefferalBy Id",
      dataIndex: "refferalBy",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "Total Refferal",
      dataIndex: "result",
      render: (text) => <p className="m-0">{text}</p>,
    },
    {
      title: "createdAt",
      dataIndex: "creractedtime",
      render: (text) => <p className="m-0">{new Date(text).toDateString()}</p>,
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
      url: `${process.env.REACT_APP_API_URL}api/customer/allusers`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data.data);
    setFillter(response?.data.data.reverse());
    setdataget(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = alldata.filter((truck) => {
        return (
          truck.username.toString().toLowerCase().match(value) ||
          truck.email.toString().toLowerCase().match(value) ||
          truck.fullname.toString().toLowerCase().match(value) ||
          truck.refferalBy.toString().toLowerCase().match(value) ||
          truck.refferalId.toString().toLowerCase().match(value) ||
          truck.result.toString().toLowerCase().match(value)
        );
      });
      setFillter(data);
    } else {
      getdata();
    }
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
              <h3 className="mb-4">All Users</h3>
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
                columns={columns}
                loading={!dataget}
                dataSource={Fillter}
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

export default Allusers;
