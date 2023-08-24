import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
function Profile() {
  let data1 = JSON.parse(localStorage.getItem("allrefdata"));
  const [submit, setesubmit] = useState(false);
  const [step, setstep] = useState(data1.Transaction);
  let data = JSON.parse(localStorage.getItem("login"));
  const schema = yup.object({
    oldpassword: yup.string().required("Please Enter your old password"),
    password: yup.string().required("Please Enter your password"),
    confirmPassword: yup
      .string()
      .required("Please Enter confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const schema1 = yup.object({
    password: yup.string().required("Please Enter your password"),
    confirmPassword: yup
      .string()
      .required("Please Enter confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div className="saidcontent pt-4">
      <ToastContainer />
      <div className="mx-3 my-3">
        <label class="mr-sm-2 pb-2" style={{ fontSize: "18px" }}>
          <b>Personal information</b>
        </label>
        <div class="form-inline row pt-2">
          <div className="col-12 col-sm-6">
            <label for="email" class="mr-sm-2">
              <b>Full name</b>
            </label>
            <input
              type="text"
              class="form-control mb-2 p-3 mr-sm-2"
              placeholder="First name"
              id="email"
              value={data.data.customer.fullname}
              disabled
            />
          </div>
          <div className="col-12 col-sm-6">
            <label for="pwd" class="mr-sm-2">
              <b>user name</b>
            </label>
            <input
              type="text"
              class="form-control mb-2 p-3 mr-sm-2"
              placeholder="Last name"
              id="pwd"
              value={data.data.customer.username}
              disabled
            />
          </div>
          <div className="col-12 col-sm-6">
            <label for="pwd" class="mr-sm-2">
              <b>Email address</b>
            </label>
            <input
              type="email"
              class="form-control mb-2 p-3 mr-sm-2"
              placeholder="Email address"
              id="pwd"
              value={data.data.customer.email}
              disabled
            />
          </div>
        </div>
      </div>
      <hr className="mx-4" />
      <div className="mx-3 my-3">
        <label class="mr-sm-2 pb-2" style={{ fontSize: "18px" }}>
          <b>Change password</b>
        </label>
        <Formik
          initialValues={{}}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values) => {
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
              url: `${process.env.REACT_APP_API_URL}api/customer/reset-password`,
              method: "POST",
              headers: headersList,
              data: { oldpassword: values.oldpassword, password: values.password },
            };
            axios
              .request(reqOptions)
              .then((data) => {
                toast.success("Password reset successfully.");
              })
              .catch((err) => {
                toast.error("something went wrong please try again");
                console.log(err);
              });
          }}
        >
          {({ values, errors, handleChange }) => (
            <>
              <Form>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div class="form-floating mb-2">
                      <input
                        type="password"
                        class="form-control"
                        name="oldpassword"
                        id="password"
                        placeholder="Enter New password"
                        onChange={handleChange}
                        value={values && values.oldpassword}
                      />
                      <label for="floatingInputValue">old password</label>
                      {errors.oldpassword ? (
                        <div className="error" style={{ color: "red" }}>
                          {errors.oldpassword}
                        </div>
                      ) : null}
                    </div>
                  </div>{" "}
                  <div className="col-12 col-sm-6">
                    <div class="form-floating mb-2">
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        id="password"
                        placeholder="Enter New password"
                        onChange={handleChange}
                        value={values && values.password}
                      />
                      <label for="floatingInputValue">password</label>
                      {errors.password ? (
                        <div className="error" style={{ color: "red" }}>
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div class="form-floating mb-2">
                      <input
                        type="password"
                        class="form-control"
                        name="confirmPassword"
                        id="password"
                        placeholder="Enter New password"
                        onChange={handleChange}
                        value={values && values.confirmPassword}
                      />
                      <label for="floatingInputValue">
                        Re-enter New password
                      </label>
                      {errors.confirmPassword ? (
                        <div className="error" style={{ color: "red" }}>
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-100 btn py-3 mt-2"
                  style={{
                    cursor: "pointer",
                    background: "#10B177",
                    border: "none",
                    color: "#fff",
                    borderRadius: "5px",
                    maxWidth: "190px",
                  }}
                >
                  Submit
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;
