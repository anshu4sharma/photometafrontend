import React, { useState } from "react";
import logo from "../../assets/1111.png";
import Ceo from "../../assets/Ceo.png";
import buy from "../../assets/buy.png";
import scure from "../../assets/scure.png";
import stock from "../../assets/Vector (3).png";
import user from "../../assets/Vector (5).png";
import { RiCheckboxCircleFill } from "react-icons/ri";
import "./Signin.scss";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineContentCopy,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function Signin() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [valid, setvalid] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleShow = () => setShow(true);
  const [stap, setstap] = useState(!false);
  const [login, setlogin] = useState(!false);
  const [Mailsend, setMailsend] = useState(false);
  const [loginemail, setloginemail] = useState("");
  const [validationActive, setvalidationActive] = useState(false);
  const [eye1, seteye1] = useState(!false);
  const [eye2, seteye2] = useState(!false);
  const [eye3, seteye3] = useState(!false);
  const navigate = useNavigate();
  useEffect(() => {
    setstap(location.state ? false : true);
    setlogin(!false);
    localStorage.getItem("reff");
    let bodyContent = {
      email: loginemail,
      otp: 0,
    };
    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/customer/register/valid`,
      method: "POST",
      data: bodyContent,
    };
    axios
      .request(reqOptions)
      .then((res) => {
        setstap(!stap);
        setShow1(false);
      })
      .catch(() => {});
  }, [location]);

  const LoginValidation = yup.object({
    Username: yup.string().required("User Name is required ."),
    OTP: yup.string().required("OTP is required ."),
    Email: yup
      .string()
      .email("Email Address is invalid .")
      .required("Email Address is required ."),
    Fullname: yup.string().required("User Name is required ."),
    mackpassword: yup.string().required("Password is required."),
    referralid: yup.string().required("referral id is required."),
    reenterpassword: yup
      .string()
      .required("Password is required.")
      .oneOf([yup.ref("mackpassword"), null], "Passwords must match"),
  });
  const LoginValidation1 = yup.object({
    Username: yup.string().required("Email Address is required ."),
    mackpassword: yup.string().required("Password is required."),
  });
  const LoginValidation2 = yup.object({
    Username: yup.string().required("Email Address is required ."),
  });
  const LoginValidation3 = yup.object({
    email: yup.string().required("Email Address is required ."),
    otp: yup.string().required("otp is required ."),
  });
  const Otpbtn = () => {
    return (
      <button
        className="w-100 btn py-3"
        style={{ background: "#535454", color: "#fff" }}
        onClick={() => {
          let bodyContent = {
            email: loginemail,
          };
          let reqOptions = {
            url: `${process.env.REACT_APP_API_URL}api/customer/mail-varify`,
            method: "POST",
            data: bodyContent,
          };
          axios
            .request(reqOptions)
            .then((data) => {
              setvalid(true);
              toast.success("otp send in your mail");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Send OTP
      </button>
    );
  };
  const onDone = () => setvalidationActive(!false);
  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-6 d-none d-xl-block col-md-5 p-5"
          style={{ background: "#1E1E1E" }}
        >
          <div className="p-4">
            <img
              src={logo}
              alt=""
              width={150}
              height={150}
              className="img-fluid pb-4"
            />
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              bottom: "1%",
            }}
          >
            <h2
              className="pt-5 pb-4 text-light"
              style={{ fontSize: "30px !important" }}
            >
              Start your <br />
              journey with us.
            </h2>
            <p
              className="pb-5"
              style={{ fontSize: "24px !important", color: "#ddd" }}
            >
              Join our community and get huge amount of rewards
              <br /> on photometa
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-7">
          <div
            className=""
            style={{
              height: "100%",
              margin: "0%",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 className="px-4 pb-2">Login to Photometa</h1>
            <h5 className="px-4 pb-4 text-muted">
              Welcome back, Enter your details.
            </h5>
            <Formik
              initialValues={{}}
              validationSchema={LoginValidation1}
              onSubmit={(values) => {
                setlogin(false);
                let bodyContent = {
                  username: values.Username,
                  password: values.mackpassword,
                };
                let reqOptions = {
                  url: `${process.env.REACT_APP_API_URL}api/customer/Admin/login`,
                  method: "POST",
                  data: bodyContent,
                };
                axios
                  .request(reqOptions)
                  .then((res) => {
                    setstap(!stap);
                    toast.success(res.data.message);
                    localStorage.setItem("login", JSON.stringify(res));
                    navigate("/admin/dashboard");
                  })
                  .catch((err) => {
                    toast.error(err.response.data.message);
                  });
                //   toast.success("Login successFully.");
                //   navigat("/Dashboard");
              }}
            >
              {({ values, errors, handleChange }) => (
                <>
                  <Form>
                    <div className="row px-4">
                      <div className="col-12">
                        <div class="form-floating mb-2">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.Username &&
                              validationActive &&
                              "was-validated"
                            }`}
                            name="Username"
                            id="floatingInput"
                            value={values && values.Password}
                            onChange={handleChange}
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">
                            Enter e-mail or username
                          </label>
                        </div>
                        {errors.Username && validationActive ? (
                          <div className="error">{errors.Username}</div>
                        ) : null}
                      </div>
                      <div className="col-12">
                        <div class="form-floating mb-2">
                          <input
                            type={eye3 ? "password" : "text"}
                            className={`form-control ${
                              errors.Password &&
                              validationActive &&
                              "was-validated"
                            }`}
                            name="mackpassword"
                            id="floatingInput"
                            value={values && values.mackpassword}
                            onChange={handleChange}
                            placeholder="Enter full name"
                          />
                          <span onClick={() => seteye3(!eye3)}>
                            {eye3 ? <AiFillEyeInvisible /> : <AiFillEye />}
                          </span>
                          <label for="floatingInput">
                            Enter login password
                          </label>
                          {errors.mackpassword && validationActive ? (
                            <div className="error">{errors.mackpassword}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-itams-center pt-3">
                        <div className="">
                          <p
                            className="text-dark m-0"
                            onClick={() => {
                              handleShow();
                            }}
                          >
                            Forgot Password ?
                          </p>
                        </div>
                      </div>
                      <div className="col-12 py-4">
                        <button
                          type="submit"
                          className="w-100 btn py-3"
                          style={{ background: "#535454", color: "#fff" }}
                          onClick={() => onDone()}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
          <Modal
            show={show1}
            onHide={handleClose1}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Email varification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{ email: loginemail }}
                validationSchema={LoginValidation3}
                onSubmit={(values) => {
                  let bodyContent = {
                    email: values.email,
                    otp: values.otp,
                  };
                  let reqOptions = {
                    url: `${process.env.REACT_APP_API_URL}api/customer/register/valid`,
                    method: "POST",
                    data: bodyContent,
                  };
                  axios
                    .request(reqOptions)
                    .then((res) => {
                      toast.success(res.data.message);
                      setShow1(false);
                      setstap(!stap);
                    })
                    .catch((res) => {
                      //api.photometa.club/(res.data.message);
                      toasthttp: setShow1(false);
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
                              type="text"
                              className={`form-control ${
                                errors.email &&
                                validationActive &&
                                "was-validated"
                              }`}
                              name="email"
                              id="floatingInput"
                              value={values && values.email}
                              onChange={handleChange}
                              disabled
                            />
                            <label for="floatingInput">Email</label>
                            {errors.email && validationActive ? (
                              <div className="error">{errors.email}</div>
                            ) : null}
                          </div>
                          <div class="form-floating mb-2">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.otp &&
                                validationActive &&
                                "was-validated"
                              }`}
                              name="otp"
                              id="floatingInput"
                              value={values && values.otp}
                              onChange={handleChange}
                            />
                            <label for="floatingInput">otp</label>
                            {errors.otp && validationActive ? (
                              <div className="error">{errors.otp}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <Modal.Footer>
                        <button
                          type="submit"
                          className="w-100 btn py-3"
                          style={{ background: "#535454", color: "#fff" }}
                        >
                          verify your email
                        </button>
                        {/* <Button variant="primary" onClick={handleClose}>
                          send link your mail
                        </Button> */}
                      </Modal.Footer>
                    </Form>
                  </>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Forget password..??</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{}}
                validationSchema={LoginValidation2}
                onSubmit={(values) => {
                  setlogin(false);
                  let bodyContent = {
                    email: values.Username,
                  };
                  let reqOptions = {
                    url: `${process.env.REACT_APP_API_URL}api/customer/Admin/forget-password`,
                    method: "POST",
                    data: bodyContent,
                  };
                  axios
                    .request(reqOptions)
                    .then((res) => {
                      setMailsend(!Mailsend);
                      toast.success("link send in your mail plz check.");
                      handleClose();
                    })
                    .catch(() => {
                      toast.error("something went wrong plz try again");
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
                              type="text"
                              className={`form-control ${
                                errors.Username &&
                                validationActive &&
                                "was-validated"
                              }`}
                              name="Username"
                              id="floatingInput"
                              value={values && values.Username}
                              onChange={handleChange}
                              placeholder="name@example.com"
                            />
                            <label for="floatingInput">Enter e-mail</label>
                            {errors.Username && validationActive ? (
                              <div className="error">{errors.Username}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <Modal.Footer>
                        <button
                          type="submit"
                          disabled={Mailsend}
                          className="w-100 btn py-3"
                          style={{ background: "#535454", color: "#fff" }}
                        >
                          send link your mail
                        </button>
                        {/* <Button variant="primary" onClick={handleClose}>
                          send link your mail
                        </Button> */}
                      </Modal.Footer>
                    </Form>
                  </>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Signin;
