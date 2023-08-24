import React from "react";
import Table from "../../components/Table";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Injected, WalletConnect } from "../../Helpers/Injected";
import Web3 from "web3";
const Moralis = require("moralis");
const { EvmChain } = require("@moralisweb3/common-evm-utils");
function Avtar() {
  useEffect(() => {
    runApp();
  }, []);
  const runApp = async () => {
    await Moralis.start({
      apiKey:
        "hD9GRNon3KEeLRx7G0DeIlMnCuZUz3vJMR95DnslKMPi7TsZWkmsIKIYWBDlBP7Z",
      // ...and any other configuration
    });

    const address = "0xA94a557950B0A3810fe904DFf87fc1D341D1227C";

    const chain = EvmChain.BSC;

    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain,
    });
    console.log(response);
  };

  const [upload, setupload] = useState(!false);
  const [BNB, setBNB] = useState(0);
  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React();
  const BASECOINGEKO = "https://api.coingecko.com/api/v3";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const connect = async () => {
    try {
      if (!account) {
        if (typeof window.ethereum !== "undefined") {
          handleShow();
        } else {
          await activate(WalletConnect);
        }
      } else {
        deactivate();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const [alldata, setalldata] = useState([]);
  const [buydata, setbuydata] = useState([]);
  const clientsHead = [
    { name: "Date", label: "creractedtime" },
    { name: "Avatar Name", label: "name" },
  ];
  useEffect(() => {
    getdata();
    loadCoinsList();
  }, []);
  useEffect(() => {
    if (error) alert(error);
  }, [error]);
  const loadCoinsList = async () => {
    axios
      .get(
        `${BASECOINGEKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`
      )
      .then((response) => {
        response.data.map((e) => {
          if (e.name === "BNB") {
            setBNB(e?.current_price.toFixed(2));
          }
        });
      })
      .catch((e) => {});
  };
  const handleSwap = async (id) => {
    if (active) {
      setupload(!upload);
      const amount = Web3.utils.toWei(
        (Number(0.011) / BNB).toFixed(3),
        "ether"
      );
      library.eth
        .sendTransaction({
          from: account,
          to: "0x56a2C4543b241c07A82e5eB2117669CB2a70FE7B",
          value: amount,
        })
        .then(async (res) => {
          let bodyContent = {
            name: id.name,
            price: id.Price,
            transactionHash: res,
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
            url: `${process.env.REACT_APP_API_URL}api/customer/buy-avtar/${id._id}`,
            method: "POST",
            headers: headersList,
            data: bodyContent,
          };
          axios
            .request(reqOptions)
            .then((res) => {
              getdata();
              setupload(!false);
              toast.success("Avatar buy successfully");
            })
            .catch((Error) => {
              toast.error("Avatar is already buy");
              setupload(!false);
            });
        })
        .catch((e) => setupload(!false), Error("Oops! Something went wrong"));
    } else {
      toast.error("connect your Wallet ");
    }
  };
  const getdata = async () => {
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
    localStorage.setItem("buyavtar", response1.data.data);
  };
  return (
    <div className="saidcontent">
      <div className="px-3 pt-4">
        <button
          onClick={connect}
          className="hedar-user Connect d-inline d-lg-none"
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "1px solid #474749",
            padding: "10px 16px",
            borderRadius: "26px",
          }}
        >
          {active
            ? `${account.substring(0, 4)}...${account.substring(38)}`
            : "Connect wallet"}
        </button>
      </div>
      <div className="d-flex justify-content-between align-content-center p-4">
        <div className="">
          <h5>Acquire AVATARS And Get Daily Rewards.</h5>
          <p>
            Acquire any Avatar and after Do not refresh or leave this page until
            the transaction is completed or you might lose your funds.
          </p>
        </div>
        <div className="">
          <button
            onClick={connect}
            className="hedar-user Connect d-none d-lg-inline"
            style={{
              cursor: "pointer",
              background: "transparent",
              border: "1px solid #474749",
              padding: "10px 16px",
              borderRadius: "26px",
            }}
          >
            {active
              ? `${account.substring(0, 4)}...${account.substring(38)}`
              : "Connect wallet"}
          </button>
        </div>
      </div>
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
        <div className="container-fluid ">
          <div className="row">
            {alldata
              .sort(function (a, b) {
                return a.Price - b.Price;
              })
              .map((e) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4 p-2">
                    <div className="" style={{ background: "#D9D9D970" }}>
                      <div className="d-flex">
                        <div className="p-4" style={{ width: "40%" }}>
                          <img
                            src={e.img}
                            alt=""
                            className="img-fluid d-block m-auto"
                            style={{
                              height: "120px",
                            }}
                          />
                        </div>
                        <div className="p-4" style={{ width: "60%" }}>
                          <h5 className="m-0 py-1" style={{ fontWeight: 600 }}>
                            {e.name}
                          </h5>
                          {/* <h6 className="m-0 py-1">15% </h6> */}
                          <h6 className="m-0 py-1">{e.Price} $</h6>
                          <h6 className="m-0 py-1">
                            {(Number(e.Price) / BNB).toFixed(3)} BNB
                          </h6>
                          {/* <h6 className="m-0 py-1">
                          Acquire Argos,lomonS,legendoX from 1st to 15th of every month
                        </h6> */}
                        </div>
                      </div>
                      <div className="w-100 px-4 pb-4">
                        <button
                          className="w-100 mb-1"
                          style={{
                            cursor: "pointer",
                            background: "#D9D9D9",
                            border: "none",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "5px",
                            padding: "10px 16px",
                          }}
                          disabled={
                            // !(
                            //   Number(new Date().toDateString().split(" ")[2]) >=
                            //     Number(e.StartToActive) &&
                            //   Number(new Date().toDateString().split(" ")[2]) <=
                            //     Number(e.EndToActive)
                            // ) ||
                            buydata.length !== 0
                          }
                          onClick={() => {
                            handleSwap(e);
                          }}
                        >
                          Acquire Avatar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <Table tableData={buydata} columns={clientsHead} sortField={""} />
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <div
                className="p-3"
                onClick={() => {
                  activate(WalletConnect);
                  handleClose();
                }}
              >
                {/* <img
                  src="/wc.png"
                  alt="Wallet Connect Logo"
                  width={26}
                  height={26}
                  borderRadius="3px"
                /> */}
                <div>Wallet Connect</div>
              </div>
              <div
                className="p-3"
                onClick={() => {
                  activate(Injected);
                  handleClose();
                }}
              >
                {/* <img
                  src="/mm.png"
                  alt="Metamask Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                /> */}
                <div>Metamask</div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Avtar;
