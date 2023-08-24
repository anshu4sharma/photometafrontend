import React from "react";
import logo from "../../assets/1111.png";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
function Forgetpassword() {
  const location = useLocation();
  const navigator = useNavigate();
  const params = useParams();
  const [validationActive, setvalidationActive] = useState(false);
  const [forgotToken, setForgotToken] = useState("");
  const [Mailsend, setMailsend] = useState(false);
  useEffect(() => {
    setForgotToken(params.id);
  }, [location]);
  const LoginValidation1 = yup.object({
    Password: yup.string().required("Password is required."),
    confirmpassword: yup
      .string()
      .required("confirm password is required.")
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
  });
  const onDone = () => setvalidationActive(!false);
  return (
    <div>
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
              <h1 className="px-4 pb-2">Forget your password ?</h1>
              <h5 className="px-4 pb-4 text-muted">
                You can reset your password here.
              </h5>
              <Formik
                initialValues={{}}
                validationSchema={LoginValidation1}
                onSubmit={(values) => {
                  let bodyContent = {
                    password: values.password,
                    token: forgotToken,
                    confirmpassword: values.confirmpassword,
                  };
                  let headersList = {
                    Accept: "*/*",
                    Authorization: `${location.pathname?.split("/")[2]}`,
                    "Content-Type": "application/json",
                  };
                  let reqOptions = {
                    url: `${process.env.REACT_APP_API_URL}api/customer/Admin/forget-password/reset-password`,
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                  };
                  axios
                    .request(reqOptions)
                    .then((res) => {
                      toast.success("password reset successfully.");
                      setMailsend(!Mailsend)
                      navigator('/')
                    }).catch((Error) => {
                      toast.error(Error.response.data.message);
                    })
                }}
              >
                {({ values, errors, handleChange }) => (
                  <>
                    <Form>
                      <div className="row px-4">
                        <div className="col-12">
                          <div class="form-floating mb-2">
                            <input
                              type="Password"
                              className={`form-control ${errors.Password &&
                                validationActive &&
                                "was-validated"
                                }`}
                              name="Password"
                              id="floatingInput"
                              value={values && values.Password}
                              onChange={handleChange}
                              placeholder="name@example.com"
                            />
                            <label for="floatingInput">Password</label>
                            {errors.Password && validationActive ? (
                              <div className="error text-danger">
                                {errors.Password}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <div class="form-floating mb-2">
                            <input
                              type="Password"
                              className={`form-control ${errors.confirmpassword &&
                                validationActive &&
                                "was-validated"
                                }`}
                              name="confirmpassword"
                              id="floatingInput"
                              value={values && values.confirmpassword}
                              onChange={handleChange}
                              placeholder="name@example.com"
                            />
                            <label for="floatingInput">confirm password</label>
                            {errors.confirmpassword && validationActive ? (
                              <div className="error text-danger">
                                {errors.confirmpassword}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12 py-4">
                          <button
                            type="submit"
                            className="w-100 btn py-3"
                            disabled={Mailsend}
                            style={{ background: "#535454", color: "#fff" }}
                            onClick={() => onDone()}
                          >
                            submit
                          </button>
                        </div>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgetpassword;
