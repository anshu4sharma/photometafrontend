import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Accordion from "../../components/Accordion/Accordion";
import "./support.scss";
import Compressor from "compressorjs";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
function Support() {
  const [alldata, setalldata] = useState([]);
  const [upload, setupload] = useState(!false);
  const [upload1, setupload1] = useState(!false);
  const [Data, setData] = useState("");
  const [step, setstep] = useState(!false);
  useEffect(() => {
    getdata();
  }, [step]);
  let close = alldata.filter((job) => job.Status === false);
  const getdata = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login"))["data"]["x-customer-token"]
      }`,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/all-ticket`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setalldata(response?.data);
  };
  const clientsHead = [
    { name: "Date", label: "creractedtime" },
    { name: "Description of issue", label: "description" },
    { name: "Attachment", label: "img" },
    { name: "Status", label: "Status" },
  ];
  const LoginValidation1 = yup.object({
    description: yup.string().required("description is required ."),
  });

  const handleChange1 = (info) => {
    setupload1(!false);
    new Compressor(info.target.files[0], {
      quality: 55.0,
      success: (compressedResult) => {
        setData(compressedResult);
      },
    });
  };
  const questionsAnswers = [
    {
      question: "HOW TO BUY AVATAR?",
      answer:
        "  YOU CAN EASILY BUY AN NFT AVATAR IN OUR MARKETPLACE AFTER YOU'VE SIGNED IN.",
    },
    {
      question: "HOW MUCH DO THE AVATAR WORTH?",
      answer: `PRICES ARE BASED ON THE VALUE OF THE INDIVIDUAL AVATAR`,
    },
    {
      question: "WHAT CRYPTOCURRENCY WILL BE USED ON THE MARKETPLACE?",
      answer: `BNB IS JUST USED ON MARKETPLACE`,
    },
    {
      question: "HOW TO BUY TOKENS?",
      answer: `YOU CAN BUY TOKENS ON PANCAKESWAP.`,
    },
    {
      question: "IS IT POSSIBLE TO GET TOKENS FOR FREE?",
      answer: `YES IT IS POSSIBLE BY TOKEN GIVEAWAY ON SITE.`,
    },
    {
      question: "HOW DO I GET TOKENS FIRST AT THE INITIAL PRICE?",
      answer: `YOU MIGHT GET THEM ON INITIAL PRICE ON OUR TOKEN PRE-SALE.`,
    },
    {
      question: "WHICH EXCHANGES WILL YOUR TOKENS BE SOLD ON?",
      answer: `OUR TOKEN WILL BE LISTED ON PANCAKESWAP EXCHANGE.`,
    },
    {
      question: "DO YOU HAVE A WHITEPAPER?",
      answer: `YES, WE HAVE.`,
    },
    {
      question: "CAN YOU RENT AVATARS?",
      answer: `UNFORTUNATELY, IT'S NOT AVAILABLE FOR NOW.`,
    },
    {
      question: "WILL IT BE POSSIBLE TO MINT TOKENS?",
      answer: `YES, BUT YOU HAVE TO BECOME A MEMBER OF OUR CLUB.`,
    },
    {
      question: "WHAT WILL BE IN THE APP BESIDE TAKING PHOTOS?",
      answer: `EARNING TOKENS AS REWARDS AND SOCIALIZING WITH NEW LIKE-MINDED USERS ARE THE OTHER FEATURES BESIDE TAKING PHOTOS.`,
    },
    {
      question: "DO YOU HAVE A REFERRAL PROGRAM?",
      answer: `YES, WE DO HAVE.`,
    },
  ];
  return (
    <div className="saidcontent pt-4">
      <ToastContainer />
      <div className="mx-3">
        <div className="d-flex justify-content-between align-content-center">
          <div className="">
            <h3>Issue Details</h3>
          </div>
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
            <div className="mx-2" style={{ width: 250 }}>
              <button
                type="submit"
                className=" ms-auto d-block px-3 py-2"
                style={{
                  cursor: "pointer",
                  background: "#D9D9D9",
                  border: "none",
                  color: "#000",
                  borderRadius: "5px",
                  maxWidth: "190px",
                }}
                onClick={() => {
                  setstep(!step);
                }}
              >
                <b> Create ticket</b>
              </button>
            </div>
          )}
        </div>
        {step ? (
          <>
            <div className="Support">
              <Accordion questionsAnswers={questionsAnswers} light={"light"} />
            </div>
            {/* <div className="d-flex align-content-center justify-content-start flex-wrap pt-2 mb-2">
              <div
                className=""
                style={{
                  width: 250,
                  border: "1px solid",
                  padding: "14px",
                  margin: "4px",
                }}
              >
                <div className="d-flex justify-content-evenly align-content-center">
                  <div className="">
                    <img src={require("../../assets/Vector (13).png")} alt="" />
                  </div>
                  <p className="pt-1">Open tickets</p>
                </div>
                <h5 className="text-center">
                  <b>{alldata.length - close.length}</b>
                </h5>
              </div>
              <div
                className=""
                style={{
                  width: 250,
                  border: "1px solid",
                  padding: "14px",
                  margin: "4px",
                }}
              >
                <div className="d-flex justify-content-evenly align-content-center">
                  <div className="">
                    <img src={require("../../assets/Vector (15).png")} alt="" />
                  </div>
                  <p className="pt-1">Closed tickets</p>
                </div>
                <h5 className="text-center">
                  <b>{close.length}</b>
                </h5>
              </div>
              <div
                className=""
                style={{
                  width: 250,
                  border: "1px solid",
                  padding: "14px",
                  margin: "4px",
                }}
              >
                <div className="d-flex justify-content-evenly align-content-center">
                  <div className="">
                    <img src={require("../../assets/Vector (14).png")} alt="" />
                  </div>
                  <p className="pt-1">Total tickets</p>
                </div>
                <h5 className="text-center">
                  <b>{alldata.length}</b>
                </h5>
              </div>
            </div>
            <div
              className=""
              style={{
                borderRadius: "11px",
                border: "1px solid",
                overflow: "hidden",
              }}
            >
              <div className="px-3 pt-3">
                <div className="d-flex py-3 align-items-center">
                  <p className="m-0">Tickets details :</p>
                  <input
                    type="text"
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let filteredList = alldata.filter(
                          (job) =>
                            job.description
                              .toString()
                              .includes(e.target.value) ||
                            job.Status.toString().includes(e.target.value)
                        );
                        setalldata(filteredList);
                      } else {
                        getdata();
                      }
                    }}
                  />
                </div>
              </div>
              {alldata && <Table tableData={alldata} columns={clientsHead} />}
            </div> */}
          </>
        ) : (
          upload && (
            <div className="p-4" style={{ background: "#EEEEEE" }}>
              <h5 className="py-2">Create your new ticket</h5>
              <Formik
                initialValues={{}}
                validationSchema={LoginValidation1}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                  if (Data !== "") {
                    setupload(!true);
                    const imageRef = ref(storage, `${Data.name + v4()}`);
                    uploadBytes(imageRef, Data).then((snapshot) => {
                      getDownloadURL(snapshot.ref).then(async (url) => {
                        let bodyContent = {
                          description: values.description,
                          img: url,
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
                          url: `${process.env.REACT_APP_API_URL}api/customer/add-ticket`,
                          method: "POST",
                          data: bodyContent,
                          headers: headersList,
                        };
                        axios
                          .request(reqOptions)
                          .then((res) => {
                            toast.success("ticket upload successfully");
                            setstep(!step);
                            setData('');
                            setupload(true);
                          })
                          .catch((err) => {
                            toast.error("network error");
                          });
                      });
                    });
                  } else {
                    toast.error("upload img");
                    setData("");
                    setupload(true);
                  }
                }}
              >
                {({ values, errors, handleChange }) => (
                  <>
                    <Form>
                      <div className="row">
                        <div className="col-12">
                          <p className="m-0 pb-2">Description of the issue</p>
                          <div class="form-floating mb-2">
                            <textarea
                              className={`form-control ${
                                errors.Password && "was-validated"
                              }`}
                              name="description"
                              id="floatingInput"
                              onChange={handleChange}
                              placeholder="Enter full name"
                              style={{ height: "100px" }}
                            />
                            <label for="floatingInput">
                              Description of the issue
                            </label>
                            {errors.description ? (
                              <div className="error text-danger">
                                {errors.description}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 pb-2">
                            Add photo / Attachment ( PNG / JPEG )
                          </p>
                          <div class="" style={{ width: 250 }}>
                            <input
                              className={`form-control`}
                              name="img"
                              type="file"
                              id="floatingInput"
                              onChange={(e) => handleChange1(e)}
                              placeholder="Enter full name"
                            />
                          </div>
                        </div>
                        <div className="col-12 py-4">
                          <button
                            type="submit"
                            className="btn py-3 px-4 m-2"
                            style={{ background: "#535454", color: "#fff" }}
                          >
                            Submit
                          </button>
                          <button
                            className=" btn py-3 px-4 m-2"
                            style={{ background: "#535454", color: "#fff" }}
                            onClick={() => {
                              setstep(!step);
                            }}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Support;
