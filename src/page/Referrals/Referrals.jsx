import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "antd";
function Referrals() {
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

    let bodyContent = JSON.stringify({
      username: "asssqwddas",
      fullname: "asssqdaa",
      email: "asddasda@gmail.com",
      password: "sadasdas",
      refferalBy: "",
    });

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/get-reffral`,
      method: "GET",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data.data);
    setdataget(true);
  };
  const clientsHead = [
    { name: "Date", label: "creractedtime" },
    { name: "username", label: "username" },
    { name: "refferalId", label: "refferalId" },
    { name: "Status", label: "isvalid" },
  ];
  const columns = [
    {
      title: "Date",
      dataIndex: "creractedtime",
      render: (text) => <p className="m-0">{new Date(text).toDateString()}</p>,
    },
    {
      title: "username",
      dataIndex: "username",
    },
    {
      title: "Refferal Id",
      dataIndex: "refferalId",
    },
    {
      title: "Status",
      dataIndex: "isvalid",
    },
  ];
  return (
    <div className="saidcontent pt-4">
      <div className="mx-3">
        <div className="">
          <h4 className="m-0 tital py-2">My referrals</h4>
          <div className="d-flex py-4 align-items-center">
            <h6 className="me-2 mb-0">Referrals details :</h6>
            <input
              type="text"
              onChange={(e) => {
                if (e.target.value !== "") {
                  let filteredList = alldata.filter(
                    (job) =>
                      job.username
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      job.email
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      job.isvalid
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
            scroll={{ x: "calc(500px + 50%)" }}
          />
        )}
      </div>
    </div>
  );
}

export default Referrals;
