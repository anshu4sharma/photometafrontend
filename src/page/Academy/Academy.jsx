import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Academy() {
  const [alldata, setalldata] = useState([]);
  const [upload, setupload] = useState(false);
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
    setalldata(response?.data.reverse());
    setupload(!upload)
  };
  return (
    <div className="saidcontent pt-4">
      <div className="container-fluid">
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
            alldata.map((e) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="p-3" style={{ background: "#D9D9D970" }}>
                    <img
                      src={e.img}
                      alt=""
                      className="img-fluid d-block m-auto"
                      width={100}
                    />
                    <h1 className="tital text-center my-2">{e.Tital}</h1>
                    <p className=" text-center" style={{ fontSize: "13px" }}>
                      {e.creractedtime}
                    </p>
                    <p className=" text-center" style={{ fontSize: "13px" }}>
                      <b></b>
                    </p>
                    <button
                      className="btn d-block mx-auto w-75 my-2"
                      style={{ background: "#ABABAB", color: "#fff" }}
                      onClick={async () => {
                        setupload(!upload);
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
                          url: `${process.env.REACT_APP_API_URL}api/customer/Admin/${e._id}`,
                          method: "GET",
                          headers: headersList,
                        };
                        axios.request(reqOptions).then((data) => {
                          fetch(data.data[0].pdf).then((response) => {
                            response.blob().then((blob) => {
                              const fileURL = window.URL.createObjectURL(blob);
                              let alink = document.createElement("a");
                              alink.href = fileURL;
                              alink.download = "photomrta.pdf";
                              alink.click();
                              setupload(!false);
                            });
                          });
                        });
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Academy;
