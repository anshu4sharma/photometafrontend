import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import stock from "../../assets/Vector (3).png";
import { ToastContainer, toast } from "react-toastify";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useWeb3React } from "@web3-react/core";
// import PMAbi from "../../Helpers/pm.json";
import PMAbi from "../../Helpers/pmtestnet.json";
import Web3 from "web3";
import Compressor from "compressorjs";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { BsFillCameraFill } from "react-icons/bs";
function Uploadimg() {
  const navigator = useNavigate();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [imgupload, setimgupload] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [dataget, setdataget] = useState(false);
  const [data, setdata] = useState([]);
  const [AvtarRelease, setAvtarRelease] = useState({});
  const [upload, setupload] = useState(!false);
  const [buydata, setbuydata] = useState([]);
  const [buydata1, setbuydata1] = useState({});
  const [tokenprice, settokenprice] = useState(0);
  const gartVal = 152;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    if (account) {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
        }`,
        "Content-Type": "application/json",
      };
      let reqOptions4 = {
        url: `${process.env.REACT_APP_API_URL}api/customer/Withdrawotpsend`,
        method: "post",
        headers: headersList,
      };
      await axios
        .request(reqOptions4)
        .then((res) => {
          toast.success("OTP send successfully");
          setTimeout(() => {
            setShow(true);
          }, 700);
        })
        .catch(() => {
          toast.error("something is wrong please try after some time");
        });
    } else {
      toast.error("plase connect your wallate");
    }
  };

  const [data1, setData1] = useState({
    bnb: 1,
    gart: "",
  });
  let buttondis = true;
  useEffect(() => {
    getdata();
    getdata1();
  }, []);
  const LoginValidation2 = yup.object({
    Amount: yup.string().required("Amount is required ."),
    OTP: yup.string().required("OTP is required ."),
  });

  const withdraw = (values) => {
    console.log(values);
    if (account) {
      const web3 = new Web3(Web3.givenProvider);
      let contract = new web3.eth.Contract(
        PMAbi,
        process.env.REACT_APP_CONTRACT_ADDRESS
      );
      const balance = (1?.toFixed(3) - (1?.toFixed(3) * 2) / 100).toFixed(3);
      const amount = Web3.utils.toWei(balance, "ether");
      const transfer = contract.methods.transfer(account, amount);
      const encodedABI = transfer.encodeABI();
      const tx = {
        from: process.env.REACT_APP_OWNER_ADDRESS,
        to: process.env.REACT_APP_CONTRACT_ADDRESS,
        gas: 2000000,
        data: encodedABI,
      };
      web3.eth.accounts
        .signTransaction(tx, process.env.REACT_APP_OWNER_PRIVATEKEY)
        .then((signed) => {
          const tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

          tran.on("confirmation", (confirmationNumber, receipt) => {
            console.log("confirmation: " + confirmationNumber);
          });

          tran.on("transactionHash", (hash) => {
            console.log(hash);
          });
          tran.on("receipt", async (receipt) => {
            console.log(receipt);
          });
          tran.on("error", console.error);
        });
    }
  };
  const clientsHead = [
    { name: "Date", label: "creractedtime" },
    { name: "Remark", label: "Remark" },
    { name: "Amount", label: "Amount" },
  ];
  const columns = [
    {
      title: "Date",
      dataIndex: "creractedtime",
      render: (text) => <p className="m-0">{new Date(text).toDateString()}</p>,
      width: "25%",
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      width: "25%",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      render: (text) => (
        <p className="m-0">
          {text.toFixed(3)}
          {" ST"}
        </p>
      ),
      width: "25%",
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
      url: `${process.env.REACT_APP_API_URL}api/customer/img-upload`,
      method: "GET",
      headers: headersList,
    };
    let reqOptions1 = {
      url: `${process.env.REACT_APP_API_URL}api/customer/get-avtar-reword`,
      method: "GET",
      headers: headersList,
    };
    let reqOptions2 = {
      url: `${process.env.REACT_APP_API_URL}api/customer/avtar-w`,
      method: "GET",
      headers: headersList,
    };

    let reqOptions4 = {
      url: `${process.env.REACT_APP_API_URL}api/customer/Buy-avtar`,
      method: "GET",
      headers: headersList,
    };
    let response4 = await axios.request(reqOptions4);
    setbuydata(response4.data);
    setbuydata1(response4.data.rewordditail[0]);
    let response = await axios.request(reqOptions);
    let response1 = await axios.request(reqOptions1);
    let response2 = await axios.request(reqOptions2);
    setAvtarRelease(response2.data[0]);
    setdata(response1.data.reverse());
    setalldata(response?.data.data);
    setdataget(true);
    setupload(false);
  };
  const getdata1 = async () => {
    let reqOptions = {
      url: "https://app.geckoterminal.com/api/p1/bsc/pools/0x33635f6654e85584dd69ca692eeee3391b959f10?include=dex%2Cdex.network.explorers%2Cnetwork_link_services%2Ctoken_link_services%2Cdex_link_services&base_token=0",
      method: "GET",
    };
    let response = await axios.request(reqOptions);
    settokenprice(response.data.data.attributes.price_in_target_token);
    console.log(response.data.data.attributes.price_in_target_token);
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
  const handleChange = (info, data) => {
    setupload(!false);
    if (!info.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setupload(false);
      toast.error("select valid image.");
      return false;
    }
    new Compressor(info.target.files[0], {
      quality: 45.0,
      success: (compressedResult) => {
        const imageRef = ref(storage, `${compressedResult.name + v4()}`);
        uploadBytes(imageRef, compressedResult).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            let headersList = {
              Accept: "*/*",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("login"))["data"][
                  "x-customer-token"
                ]
              }`,
              "Content-Type": "application/json",
            };
            let bodyContent = JSON.stringify({
              img: url,
              creractedtime: new Date().toLocaleDateString(),
            });
            let reqOptions = {
              url: `${process.env.REACT_APP_API_URL}api/customer/img-upload`,
              method: "POST",
              headers: headersList,
              data: bodyContent,
            };
            await axios
              .request(reqOptions)
              .then(() => {
                getdata();
                toast.success("Image uploaded successfully");
                setupload(false);
              })
              .catch((err) => {
                toast.error(err.response.data.message);
                setupload(false);
              });
          });
        });
        // getBase64(compressedResult)
        //   .then(async (result) => {
        //     let headersList = {
        //       Accept: "*/*",
        //       Authorization: `Bearer ${
        //         JSON.parse(localStorage.getItem("login"))["data"][
        //           "x-customer-token"
        //         ]
        //       }`,
        //       "Content-Type": "application/json",
        //     };
        //     let bodyContent = JSON.stringify({
        //       img: result,
        //       creractedtime: new Date().toLocaleDateString(),
        //     });
        //     let reqOptions = {
        //       url: `${process.env.REACT_APP_API_URL}api/customer/img-upload`,
        //       method: "POST",
        //       headers: headersList,
        //       data: bodyContent,
        //     };
        //     await axios
        //       .request(reqOptions)
        //       .then(() => {
        //         getdata();
        //         toast.success("Image uploaded successfully");
        //         setupload(false);
        //       })
        //       .catch((err) => {
        //         toast.error(err.response.data.message);
        //         setupload(false);
        //       });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
    });
  };

  return (
    <div className="saidcontent">
      <ToastContainer />
      {upload ? (
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
        <div className="container-fluid ">
          <div className="row p-3">
            <div className="col-12 col-md-7 px-2 pt-3">
              <div
                className="d-flex flex-wrap align-items-center py-3 px-4  justify-content-between"
                style={{
                  background: "rgba(217, 217, 217, 0.44)",
                  borderRadius: "11px",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="">
                    <img src={stock} className="" />
                  </div>
                  <div className="px-4 text-all">
                    <h4 className="tital">Avatar Release</h4>
                    <h4 className="tital">
                      {AvtarRelease ? AvtarRelease.wallate?.toFixed(3) : 0} ST
                    </h4>
                  </div>
                </div>
                <div className="d-flex flex-wrap">
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <div className="m-1" style={{ width: "200px" }}>
                      <button
                        className="d-flex justify-content-center mx-1  align-items-center m-0 my-sm-2 py-2 buybtn1 "
                        style={{ margin: "0%", background: "#fff" }}
                        onClick={() => navigator("/WithdrawHistory")}
                      >
                        <TbArrowsLeftRight className="me-3" />
                        Withdraw History
                      </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <div className="m-1" style={{ width: "200px" }}>
                      <button
                        className="d-flex justify-content-center mx-1  align-items-center m-0 my-sm-2 py-2 buybtn1 "
                        style={{ margin: "0%", background: "#fff" }}
                        disabled={
                          (buydata1?.day >= 142 && buydata1?.day <= 151) ||
                          (buydata1?.day >= 265 && buydata1?.day <= 273) ||
                          (buydata1?.day >= 356 && buydata1?.day <= 365)
                        }
                        onClick={() => handleShow()}
                      >
                        <TbArrowsLeftRight className="me-3" />
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 px-2 pt-4 pt-md-3">
              <div
                className="p-3"
                style={{
                  background: "#3c6ff0",
                  borderRadius: "11px",
                  height: "100%",
                }}
              >
                <p className="text-light text-center">
                  <b>2% will be charged as a transaction fees</b>
                </p>
                <h5 className="text-light tital mb-0 text-center">
                  <b>
                    {AvtarRelease
                      ? (
                          AvtarRelease.wallate?.toFixed(3) -
                          (AvtarRelease.wallate?.toFixed(3) * 2) / 100
                        ).toFixed(3)
                      : 0}{" "}
                    ST
                  </b>{" "}
                  = You will get{"   "}{" "}
                  <b>
                    {AvtarRelease
                      ? (
                          AvtarRelease.wallate?.toFixed(3) * tokenprice -
                          ((AvtarRelease.wallate?.toFixed(3) * 2) / 100) *
                            tokenprice
                        ).toFixed(3)
                      : 0}{" "}
                    PM-v2
                  </b>
                </h5>
              </div>
            </div>
          </div>
          <div
            className="p-3 mt-0 mx-2 mb-3"
            style={{
              cursor: "pointer",
              background: "rgba(217, 217, 217, 0.44)",
              border: "none",
              borderRadius: "11px",
              padding: "10px 16px",
            }}
          >
            <div className="d-flex flex-wrap">
              <div className="my-1 d-flex align-content-center">
                <img
                  src={require("./photogenic.jpg")}
                  alt=""
                  width={45}
                  height={45}
                  style={{ borderRadius: "12px", objectFit: "fill" }}
                />
                <div className="px-2 d-flex align-items-center justify-content-center">
                  <p className="m-1" style={{ fontSize: "13px" }}>
                    Every Fifteen Days Photogenic Charging Cost 2% (Auto-deduct)
                  </p>
                </div>
              </div>
              <div className="my-1 d-flex align-content-center">
                <img
                  src={require("./lens repair.jpg")}
                  alt=""
                  width={45}
                  height={45}
                  style={{ borderRadius: "12px", objectFit: "fill" }}
                />
                <div className="px-2 d-flex align-items-center justify-content-center">
                  <p className="m-1" style={{ fontSize: "13px" }}>
                    Every Two Month Lens Replace Cost 10% (Auto-deduct)
                  </p>
                </div>
              </div>
              <div className="my-1 d-flex align-content-center">
                <img
                  src={require("./uplifting.jpg")}
                  alt=""
                  width={45}
                  height={45}
                  style={{ borderRadius: "12px", objectFit: "fill" }}
                />
                <div className="px-2 d-flex align-items-center justify-content-center">
                  <p className="m-1" style={{ fontSize: "13px" }}>
                    Every 5th Month And 9th Month Uplifting Cost 28%
                    (Auto-deduct)
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap mt-3 mb-4">
              {alldata.map((e) => {
                return (
                  <div
                    className="d-flex flex-wrap"
                    style={{
                      width: "100px",
                    }}
                  >
                    <div
                      className="m-1"
                      style={{
                        cursor: "pointer",
                        background: "#313232",
                        color: "#fff",
                        border: "none",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "12px",
                        width: "120px",
                        height: "80px",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 14px",
                      }}
                    >
                      <b className="img-count">
                        {e.img === "" || e.img1 === ""
                          ? e.img === "" && e.img1 === ""
                            ? 0
                            : 1
                          : 2}
                        /2
                      </b>
                    </div>
                    <h6
                      className="text-center"
                      style={{ padding: "0px 17.5px", fontSize: "14px" }}
                    >
                      <b>{new Date(e.creractedtime).toLocaleDateString()}</b>
                    </h6>
                  </div>
                );
              })}
            </div>
            <div class="upload-btn-wrapper">
              <button
                class="btn"
                style={{
                  cursor: "pointer",
                  background: "rgb(60, 111, 240)",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                }}
                disabled={buydata.data.length === 0}
              >
                <BsFillCameraFill className="me-2" /> Click to upload picture
              </button>
              <input
                type="file"
                name="myfile"
                disabled={buydata.data.length === 0}
                onChange={(el) => handleChange(el)}
              />
            </div>
            <p className="pt-2 text-danger">
              <b>
                Note: Don't upload same picture, otherwise you will lose your
                reward
              </b>
            </p>
          </div>
          <h5 className="tital mx-2 mb-3">
            <b>My Picture Gallary</b>
          </h5>
          <div
            className="p-4 m-2 m-0"
            style={{
              cursor: "pointer",
              background: "rgba(217, 217, 217, 0.44)",
              border: "none",
              borderRadius: "5px",
              padding: "10px 16px",
            }}
          >
            {alldata.map((e) => {
              if (
                new Date(e.creractedtime).toLocaleDateString() ===
                new Date().toLocaleDateString()
              ) {
                return (
                  <div className="d-flex flex-wrap">
                    {e.img !== "" && (
                      <img
                        src={e.img}
                        alt=""
                        style={{
                          cursor: "pointer",
                          border: "none",
                          background: "#fff",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          borderRadius: "5px",
                          width: "70px",
                          height: "70px",
                          padding: "10px 16px",
                          margin: "4px",
                        }}
                      />
                    )}
                    {e.img1 !== "" && (
                      <img
                        src={e.img1}
                        alt=""
                        style={{
                          cursor: "pointer",
                          border: "none",
                          background: "#fff",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          borderRadius: "5px",
                          width: "70px",
                          height: "70px",
                          padding: "10px 16px",
                          margin: "4px",
                        }}
                      />
                    )}
                  </div>
                );
              }
            })}
          </div>
          <div className="py-2 p-2">
            {data && (
              <Table
                columns={columns}
                loading={!dataget}
                dataSource={data}
                size={"small"}
                scroll={{ x: "calc(500px + 50%)" }}
              />
            )}
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw Your Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{}}
            validationSchema={LoginValidation2}
            onSubmit={async (values) => {
              console.log(values);
              const data = {
                wallet_type: 0,
                token_amount: values.Amount,
                PM:
                  values.Amount !== 0
                    ? values?.Amount * tokenprice -
                      ((values?.Amount * 2) / 100) * tokenprice
                    : 0,
                OTP: values.OTP,
                to_address: account,
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
              let reqOptions4 = {
                url: `${process.env.REACT_APP_API_URL}api/customer/payment`,
                method: "post",
                headers: headersList,
                data: data,
              };
              await axios
                .request(reqOptions4)
                .then(async (r) => {
                  console.log(r);
                })
                .catch((e) => {
                  toast.error(e.response.data.message);
                });
            }}
          >
            {({ values, errors, handleChange }) => (
              <>
                <Form>
                  <div className="row">
                    <div className="col-12">
                      <div class="form-floating mb-2">
                        <input
                          type="number"
                          className={`form-control ${
                            errors.tpassword && "was-validated"
                          }`}
                          name="Amount"
                          id="floatingInput"
                          value={
                            values.Amount !== 0
                              ? values?.Amount * tokenprice -
                                ((values?.Amount * 2) / 100) * tokenprice
                              : 0
                          }
                          disabled={true}
                          onChange={handleChange}
                          placeholder="Transaction Password"
                        />
                        <label for="floatingInput">Send PM Tokens</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-floating mb-2">
                        <input
                          type="number"
                          className={`form-control ${
                            errors.tpassword && "was-validated"
                          }`}
                          name="Amount"
                          min={0}
                          id="floatingInput"
                          value={values ? values.Amount : 0}
                          onChange={handleChange}
                          placeholder="Transaction Password"
                        />
                        <label for="floatingInput">Amount</label>
                        {errors.Amount ? (
                          <div className="error">{errors.Amount}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-floating mb-2">
                        <input
                          type="password"
                          className={`form-control ${
                            errors.tpassword && "was-validated"
                          }`}
                          name="OTP"
                          id="floatingInput"
                          value={values && values.OTP}
                          onChange={handleChange}
                          placeholder="Transaction Password"
                        />
                        <label for="floatingInput">OTP</label>
                        {errors.OTP ? (
                          <div className="error">{errors.OTP}</div>
                        ) : null}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-100 btn py-3 mt-3"
                      style={{ background: "#535454", color: "#fff" }}
                    >
                      submit
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Uploadimg;
