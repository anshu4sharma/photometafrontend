import React, { useState } from "react";
import buy from "../../assets/buy.png";
import scure from "../../assets/scure.png";
import stock from "../../assets/Vector (3).png";
import user from "../../assets/Vector (5).png";
import { FaUserCircle } from "react-icons/fa";
import bunny from "../../assets/bunny-color.png";
import { MdOutlineFileCopy } from "react-icons/md";
import "./Dashboard.scss";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import "react-toastify/dist/ReactToastify.css";
import PMAbi from "../../Helpers/pm.json";
import { useNavigate } from "react-router-dom";
import argos from "../../assets/1 argos (1).png";
import pentox from "../../assets/pentox.png";
import lomon from "../../assets/3 lomon S.jpg";
import Yoshiko from "../../assets/4 Yoshiko D.png";
import legendo from "../../assets/5 legendo X (1).png";
import { useRef } from "react";
import { Table } from "antd";
import { Modal } from "react-bootstrap";
import Web3 from "web3";
function Dashboard() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const navigate = useNavigate();
  const [upload, setupload] = useState(!false);
  const [dataget, setdataget] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [alldata1, setalldata1] = useState([]);
  const [Total, setTotal] = useState(0);
  const [userdata, setuserdata] = useState({});
  const [AvtarRelease, setAvtarRelease] = useState({});
  const [buydata, setbuydata] = useState([]);
  const [rewordditail, setrewordditail] = useState({
    batteryrecharge: false,
    lencechange: false,
    repairingcharge: false,
  });
  // The state for our timer
  const [open, setopen] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const Ref = useRef(null);
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours + "Hr" : "0" + "Hr" + hours + "Hr") +
          ":" +
          (minutes > 9 ? minutes + "Min" : "0" + "Min" + minutes + "Min") +
          ":" +
          (seconds > 9 ? seconds + "Sec" : "0" + "Sec" + seconds + "Sec")
      );
    }
  };
  const clearTimer = (e) => {
    setTimer("00:00:10");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 86400);
    return deadline;
  };
  const handleClose = () => setopen(!open);
  useEffect(() => {
    clearTimer(getDeadTime());
  }, [timer === "00:00:00"]);
  useEffect(() => {
    getdata();
    getdata2();
  }, []);
  let text = `https://photometa.club/Signin/${userdata?.refferalId}`;
  const clientsHead = [
    { name: "Received date", label: "creractedtime" },
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
          {Number(text).toFixed(3)}
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

    let bodyContent = JSON.stringify({
      username: "asssqwddas",
      fullname: "asssqdaa",
      email: "asddasda@gmail.com",
      password: "sadasdas",
      refferalBy: "",
    });

    let reqOptions2 = {
      url: `${process.env.REACT_APP_API_URL}api/customer/reword`,
      method: "GET",
      headers: headersList,
    };
    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/get-reffral`,
      method: "GET",
      headers: headersList,
      data: bodyContent,
    };
    let reqOptions3 = {
      url: `${process.env.REACT_APP_API_URL}api/customer/avtar-w`,
      method: "GET",
      headers: headersList,
    };
    let response = await axios.request(reqOptions);
    let response2 = await axios.request(reqOptions2);
    let response3 = await axios.request(reqOptions3);
    setAvtarRelease(response3.data[0]);
    response2.data.map((e, i) => {
      let a = i + 1;
      setTotal(e.Amount * a);
    });
    setalldata1(response2.data.reverse());
    setalldata(response?.data);
    setuserdata(response?.data.userdata);
    localStorage.setItem("allrefdata", JSON.stringify(response?.data));
    setdataget(true);
    setupload(false);
  };

  const getdata2 = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/avtar`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data);
    let reqOptions1 = {
      url: `${process.env.REACT_APP_API_URL}api/customer/Buy-avtar`,
      method: "GET",
      headers: headersList,
    };
    let response1 = await axios.request(reqOptions1);
    setbuydata(response1.data.data);
    response1.data.rewordditail.map((e) => {
      if (
        e.batteryrecharge !== undefined ||
        e.lencechange !== undefined ||
        e.lencechange !== undefined
      ) {
        setopen(true);
        setrewordditail({
          ...rewordditail,
          batteryrecharge: e.batteryrecharge !== undefined ? true : false,
          lencechange: e.lencechange !== undefined ? true : false,
          repairingcharge: e.repairingcharge !== undefined ? true : false,
        });
      }
    });
  };
  const withdraw = (values, password) => {
    if (account && Total !== 0) {
      const web3 = new Web3(Web3.givenProvider);
      let contract = new web3.eth.Contract(
        PMAbi,
        process.env.REACT_APP_CONTRACT_ADDRESS
      );
      const balance = Total.toFixed(3);
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
            let headersList = {
              Accept: "*/*",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("login"))["data"][
                  "x-customer-token"
                ]
              }`,
              "Content-Type": "application/json",
            };
          });
          tran.on("error", console.error);
        });
    }
  };
  return (
    <div className="saidcontent">
      <ToastContainer />
      <div className="container-fluid ">
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
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-between justify-content-sm-end py-2 px-3">
                  <button
                    className="hedar-user d-inline d-lg-none mx-2"
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      border: "1px solid #474749",
                      padding: "10px 16px",
                      borderRadius: "26px",
                    }}
                  >
                    1ST = 1USDT
                  </button>
                  <button
                    className="hedar-user d-inline d-lg-none mx-2"
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      border: "1px solid #474749",
                      padding: "10px 12px",
                      borderRadius: "26px",
                      width: 150,
                      overflow: "hidden",
                      display: "flex",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => {
                      navigate("/Profile");
                    }}
                  >
                    <FaUserCircle
                      style={{ fontSize: "23px" }}
                      className="me-3"
                    />
                    {userdata?.username}
                  </button>
                </div>
                <div className="d-flex align-items-center px-4">
                  <div
                    className="px-4 py-3 mx-2 mt-3"
                    style={{
                      background: "#252626",
                      borderRadius: "11px",
                      minWidth: "220px",
                    }}
                  >
                    <h6 className="text-light text-center m-0">
                      <b>
                        {23 - h}Hr: {60 - m}Min: {60 - s}Sec
                      </b>
                    </h6>
                  </div>
                </div>
                <div className="col-12 col-md-8 pt-4">
                  <div
                    className="px-4 py-3 d-flex justify-content-between align-items-center mx-3"
                    style={{
                      background: "rgba(217, 217, 217, 0.44)",
                      borderRadius: "11px",
                    }}
                  >
                    <div className="">
                      <h4 className="tital m-0" style={{ fontWeight: 600 }}>
                        Buy photometa tokens on Pancakeswap
                      </h4>
                    </div>
                    <div className="d-flex">
                      <div className="d-flex justify-content-center align-items-center px-2">
                        <img
                          src={bunny}
                          alt=""
                          width={30}
                          className="img-fluid mx-2"
                        />
                      </div>
                      <div className="">
                        <a
                          className="d-flex justify-content-center align-items-center px-3 py-2 buybtn1"
                          href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xD03008E8A6BA9DE12195858210A6E93b9d3Db06E"
                        >
                          <img src={buy} width={14} className="me-3" />
                          Buy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {buydata[0] && (
                  <div className="col-12 col-md-4 px-4 ">
                    <div className="py-3 d-flex  align-content-center">
                      <div className="">
                        <img
                          src={
                            buydata[0]?.name === "Argos"
                              ? argos
                              : buydata[0]?.name === "Pentox"
                              ? pentox
                              : buydata[0]?.name === "LOMON-S"
                              ? lomon
                              : buydata[0]?.name === "Yoshiko D"
                              ? Yoshiko
                              : buydata[0]?.name === "Robex"
                              ? "https://firebasestorage.googleapis.com/v0/b/svdxv-xcv.appspot.com/o/images%2F79ba8660-c2ac-401d-b591-0e89eaf61d0a.jpg?alt=media&token=c6b10bb1-6191-4870-836a-403145ec6827"
                              : buydata[0]?.name === "Imperium"
                              ? "https://firebasestorage.googleapis.com/v0/b/svdxv-xcv.appspot.com/o/images%2Ff0e9a01a-e774-4756-b23e-59f8032f4a14.jpg?alt=media&token=581dc13b-257f-41c4-a914-629c45fbc344"
                              : legendo
                          }
                          alt=""
                          className="img-fluid mt-2"
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "6px",
                          }}
                        />
                      </div>
                      <div className="d-flex align-items-center px-3">
                        {buydata[0]?.name && (
                          <h2 className="tital m-0">
                            <b>{buydata[0]?.name}</b>
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {buydata[0] && (
                  <div className="px-4 pt-2">
                    <h5 className="m-0 ps-1">
                      Your Avatar will burn on {" : "}
                      {new Date(buydata[0]?.creractedtime)
                        .toDateString()
                        .slice(0, -4)}
                      {new Date(buydata[0]?.creractedtime).getFullYear() + 1}
                    </h5>
                  </div>
                )}
                <div className="col-12 p-4">
                  <div
                    className="p-3 m-0 row align-items-center"
                    style={{
                      background: "rgba(217, 217, 217, 0.44)",
                      borderRadius: "11px",
                    }}
                  >
                    <div className="col-12 col-lg-6 d-flex align-items-center">
                      <div className="d-none d-md-block">
                        <img src={stock} className="" />
                      </div>
                      <div className="px-3 text-all">
                        <h4 className="tital">My portfolio</h4>
                        <h4 className="tital">
                          {userdata?.walletbalance
                            ? userdata?.walletbalance
                            : 0}
                          .00 ST
                        </h4>
                      </div>
                      <div className="px-3 text-all">
                        <h4 className="tital">Wallet release</h4>
                        <h4 className="tital">
                          {Total && Total.toFixed(3)} ST
                        </h4>
                      </div>
                      <div className="px-3 text-all">
                        <h4 className="tital">Avatar Release</h4>
                        <h4 className="tital">
                          {AvtarRelease ? AvtarRelease.wallate?.toFixed(3) : 0}{" "}
                          ST
                        </h4>
                      </div>
                    </div>
                    <div className="col-2 col-lg-6">
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="d-none d-lg-block d-xl-flex align-items-center">
                          <div className="mx-4">
                            <img src={scure} alt="" width={35} height={40} />
                          </div>
                          <div className="m-1">
                            <button
                              className="d-flex justify-content-center mx-1 align-items-center px-3  my-sm-2 py-2 buybtn1"
                              style={{ margin: "0%" }}
                              disabled={
                                !(
                                  Total?.toFixed(3) ===
                                  AvtarRelease?.wallate?.toFixed(3)
                                )
                              }
                            >
                              <TbArrowsLeftRight className="me-3" />
                              Withdraw Wallet Release
                            </button>
                          </div>
                          <div className="m-1">
                            <button
                              className="d-flex justify-content-center mx-1 align-items-center px-3  my-sm-2 py-2 buybtn1"
                              style={{ margin: "0%" }}
                              onClick={() => {
                                navigate("/Upload/picture");
                              }}
                            >
                              <TbArrowsLeftRight className="me-3" />
                              Avatar History
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-block d-sm-flex d-lg-none py-3">
                        <div className="m-1">
                          <button
                            className="d-flex justify-content-center mx-1 align-items-center px-3  my-sm-2 py-2 buybtn1"
                            style={{ margin: "0%" }}
                            disabled={true}
                          >
                            <TbArrowsLeftRight className="me-3" />
                            Withdraw Wallet Release
                          </button>
                        </div>
                        <div className="m-1">
                          <button
                            className="d-flex justify-content-center mx-1 align-items-center px-3  my-sm-2 py-2 buybtn1"
                            style={{ margin: "0%" }}
                            onClick={() => {
                              navigate("/Upload/picture");
                            }}
                          >
                            <TbArrowsLeftRight className="me-3" />
                            Avatar History
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6  px-4 mb-2">
                  <div
                    className="w-100 p-3 d-flex justify-content-between"
                    style={{
                      background: "rgba(217, 217, 217, 0.44)",
                      borderRadius: "11px",
                    }}
                  >
                    <div className="">
                      <div className="d-flex">
                        <div className="px-4">
                          <img src={user} className="pt-2" />
                        </div>
                        <div className="">
                          <h4 className="tital">Referrals</h4>
                          <h4 className="tital">{alldata?.data?.length}</h4>
                          {/* <h4 className="tital">{alldata?.data?.length}</h4> */}
                          {/* <p className="tital">
                            refferalId: {userdata?.refferalId}
                          </p> */}
                        </div>
                      </div>
                      <div className="container p-0">
                        <div className="row m-0 ">
                          <div className="col-12 col-md-9 py-2">
                            <button
                              className="d-flex justify-content-center align-items-center px-3 py-2 buybtn1"
                              id="buybtn1"
                            >
                              <p
                                className="m-0 link_ref"
                                style={{
                                  whiteSpace: "nowrap",
                                  width: "225px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {userdata?.refferalId}
                              </p>
                            </button>
                          </div>
                          <div className="col-12 col-md-3 py-2">
                            <button
                              className="d-flex justify-content-center align-items-center px-4 py-2 buybtn1"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  userdata?.refferalId
                                );
                                toast.success("text copy successfully.");
                              }}
                            >
                              <p className="m-0 d-flex align-items-center">
                                <MdOutlineFileCopy className="me-2" />
                                Copy
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6  px-4 mb-2">
                  <div
                    className="w-100 p-4 h-100 d-flex justify-content-between"
                    style={{
                      background: "rgba(217, 217, 217, 0.44)",
                      borderRadius: "11px",
                    }}
                  >
                    <div className="">
                      <div className="d-flex">
                        <div className="px-4">
                          <h1>$</h1>
                        </div>
                        <div className="">
                          <h2 className="tital">
                            {!userdata?.earlybirdwallate !== undefined
                              ? userdata?.earlybirdwallate
                              : 50}
                            .00 ST
                          </h2>
                          <h4 className="tital">Early Bird Wallet</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12   px-4 mb-2">
                  <h2 className="tital">Daily Rewards:</h2>
                  {alldata && (
                    <Table
                      columns={columns}
                      loading={!dataget}
                      dataSource={alldata1}
                      size={"small"}
                      scroll={{ x: "calc(500px + 50%)" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Charging cost notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rewordditail.batteryrecharge && (
            <>
              <div
                className=""
                style={{
                  background: "rgb(59,102,172)",
                  background:
                    "linear-gradient(0deg, rgba(59,102,172,1) 0%, rgba(50,185,218,1) 100%)",
                  borderRadius: "12px",
                }}
              >
                <p className="text-light p-4">
                  2%  Photogenic Charging Cost{" "}
                  {buydata && (buydata[0]?.price * 2) / 100} will be deducted
                  from your wallet. Make sure you have enough assest to pay the
                  cost. Failing to pay the charging cost will cost you lose your
                  avatar.
                </p>
              </div>
            </>
          )}
          {rewordditail.lencechange && (
            <>
              <div
                className=""
                style={{
                  background: "rgb(29,37,50)",
                  background:
                    "linear-gradient(0deg, rgba(29,37,50,1) 0%, rgba(85,125,219,1) 100%)",
                  borderRadius: "12px",
                }}
              >
                <p className="text-light p-4">
                  10% Lens Replace Cost {"  "}
                  {buydata && (buydata[0]?.price * 10) / 100} will be deducted
                  from your wallet. Make sure you have enough assest to pay the
                  cost. Failing to pay the charging cost will cost you lose your
                  avatar.
                </p>
              </div>
            </>
          )}
          {rewordditail.repairingcharge && (
            <>
              <div
                className=""
                style={{
                  background: "rgb(84,152,130)",
                  background:
                    "linear-gradient(0deg, rgba(84,152,130,1) 0%, rgba(48,157,83,1) 100%)",
                  borderRadius: "12px",
                }}
              >
                <p className="text-light p-4">
                  28% Uplifting Cost{" "}
                  {buydata && (buydata[0]?.price * 28) / 100} will be deducted
                  from your wallet. Make sure you have enough assest to pay the
                  cost. Failing to pay the charging cost will cost you lose your
                  avatar.
                </p>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
