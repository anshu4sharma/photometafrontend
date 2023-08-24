import React, { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../../assets/1111.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Header() {
  const [Reviews, setReviews] = useState(false);
  const [open, setopen] = useState(false);
  const [parth, setparth] = useState("/");
  const [account_dropdown, setaccount_dropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [login, setlogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = () => setShow(false);
  const div1 = React.useRef()
  const div2 = React.useRef()
  const div3 = React.useRef()
  useEffect(() => {
    setparth(location.pathname);
    window.scroll(0, 0);
  }, [location]);

  return (
    <>
      <header className="header" style={{ background: "#0c0c0d" }}>
        <div className="container">
          <div className="navbar-2">
            <div className="brand my-3">
              <img
                src={logo}
                alt=""
                className="img-fluid pt-1"
                width={135}
                height={160}
              />
            </div>
            <div className="burger" id="burger" onClick={() => setopen(!open)}>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </div>
            <span className="overlay"></span>
            <div className={` ${open ? "menu is-active" : "menu"}`} id="menu">
              <ul className="menu-inner">
                <li
                  className="menu-item px-1  d-black d-xl-none "
                  style={{ textAlign: "end" }}
                >
                  <span
                    className="menu-link  text-danger"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={() => setopen(!open)}
                  >
                    X
                  </span>
                </li>
                <li className="menu-item px-1">
                  <span
                    className="menu-link "
                    style={{
                      color: `${parth === "/" ? "hsl(13, 83%, 50%)" : "#000"}`,
                    }}
                    onClick={() => {
                      setopen(!open);
                    }}
                  >
                    Home{" "}
                  </span>
                </li>
                <li
                  className="menu-item px-1"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  <span
                    className="menu-link"
                    style={{
                      color: `${
                        parth === "/About" ? "hsl(13, 83%, 50%)" : "#000"
                      }`,
                    }}
                  >
                    About us
                  </span>
                </li>
                <li
                  className="menu-item px-1"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  <span
                    className="menu-link "
                    style={{
                      color: `${
                        parth === "/Services" ? "hsl(13, 83%, 50%)" : "#000"
                      }`,
                    }}
                  >
                    Marketplace
                  </span>
                </li>
                <li
                  className="menu-item px-1"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  <span
                    className="menu-link "
                    style={{
                      color: `${
                        parth === "/Services" ? "hsl(13, 83%, 50%)" : "#000"
                      }`,
                    }}
                  >
                    Whitepaper
                  </span>
                </li>
                <li
                  className="menu-item px-1"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  <span
                    className="menu-link "
                    style={{
                      color: `${
                        parth === "/Packages" ? "hsl(13, 83%, 50%)" : "#000"
                      }`,
                    }}
                  >
                    Contact us
                  </span>
                </li>
              </ul>
            </div>
            <div className="ms-auto d-flex ">
              <button
                className="Login px-2 px-sm-3 m-1 py-2"
                onClick={() => {
                  navigate("/Signin/new", {
                    state: "Login",
                  });
                }}
              >
                Log in
              </button>
              <button
                className="Sign px-2 px-sm-3 m-1 py-2"
                onClick={() => {
                  navigate("/Signin/new");
                }}
              >
                Sign up
              </button>
              {/* {login ? (
                <span
                  className="menu-item d-flex justify-content-center align-items-center ms-1 px-1"
                  onClick={() => {
                    navigate("/Login");
                    setlogin(false);
                  }}
                >
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="img-fluid"
                  >
                    <path
                      d="M0.92749 12.6997C0.92749 12.231 0.92749 11.7624 0.92749 11.2937C0.940692 11.2277 0.960494 11.1617 0.967094 11.0891C1.09911 9.22112 1.63376 7.47195 2.61066 5.87459C4.51825 2.76568 7.26412 0.858086 10.8615 0.184818C11.3103 0.0990099 11.7724 0.0594059 12.2278 0C12.6965 0 13.1651 0 13.6338 0C13.6932 0.0132013 13.7526 0.0330033 13.812 0.039604C15.4885 0.158416 17.0793 0.587459 18.5381 1.40594C22.4786 3.61716 24.6239 6.9901 24.9077 11.505C25.0265 13.4455 24.6635 15.3267 23.7922 17.0693C21.6602 21.3399 18.1948 23.67 13.4291 23.9802C11.2641 24.1188 9.19812 23.637 7.29713 22.5941C3.91759 20.7261 1.84498 17.8878 1.11891 14.0858C1.0265 13.6304 0.986896 13.1617 0.92749 12.6997ZM12.9407 13.4984C12.9407 13.4851 12.9407 13.4719 12.9407 13.4587C12.1816 13.4587 11.4225 13.4521 10.6701 13.4587C8.73607 13.4719 7.16511 14.6865 6.70967 16.5215C6.55125 17.1683 6.45884 17.8416 6.90769 18.4092C7.16511 18.7393 7.51495 19.0165 7.86478 19.2607C9.75257 20.5677 11.845 21.0759 14.1288 20.7723C15.8318 20.5479 17.3235 19.8548 18.6371 18.7591C19.0529 18.4158 19.2443 17.9538 19.2443 17.4191C19.2443 15.4521 17.7064 13.6898 15.746 13.5182C14.8219 13.4257 13.878 13.4984 12.9407 13.4984ZM8.95389 7.55116C8.95389 9.72937 10.7361 11.5182 12.9143 11.5248C15.0991 11.5314 16.9077 9.72277 16.8945 7.54455C16.8813 5.35314 15.1057 3.58416 12.9209 3.59076C10.7361 3.59736 8.96049 5.36634 8.95389 7.55116Z"
                      fill={`${parth === "/Login" ? "#E74216" : "#000"}`}
                    />
                  </svg>
                  <span
                    className="d-none d-sm-block menu-link"
                    style={{
                      color: `${
                        parth === "/Login" ? "hsl(13, 83%, 50%)" : "#000"
                      }`,
                    }}
                  >
                    Login
                  </span>
                </span>
              ) : (
                <span
                  className="menu-item d-flex justify-content-center align-items-center ms-1 px-1"
                  onClick={() => {
                    setaccount_dropdown(!account_dropdown);
                  }}
                >
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="img-fluid "
                  >
                    <path
                      d="M0.92749 12.6997C0.92749 12.231 0.92749 11.7624 0.92749 11.2937C0.940692 11.2277 0.960494 11.1617 0.967094 11.0891C1.09911 9.22112 1.63376 7.47195 2.61066 5.87459C4.51825 2.76568 7.26412 0.858086 10.8615 0.184818C11.3103 0.0990099 11.7724 0.0594059 12.2278 0C12.6965 0 13.1651 0 13.6338 0C13.6932 0.0132013 13.7526 0.0330033 13.812 0.039604C15.4885 0.158416 17.0793 0.587459 18.5381 1.40594C22.4786 3.61716 24.6239 6.9901 24.9077 11.505C25.0265 13.4455 24.6635 15.3267 23.7922 17.0693C21.6602 21.3399 18.1948 23.67 13.4291 23.9802C11.2641 24.1188 9.19812 23.637 7.29713 22.5941C3.91759 20.7261 1.84498 17.8878 1.11891 14.0858C1.0265 13.6304 0.986896 13.1617 0.92749 12.6997ZM12.9407 13.4984C12.9407 13.4851 12.9407 13.4719 12.9407 13.4587C12.1816 13.4587 11.4225 13.4521 10.6701 13.4587C8.73607 13.4719 7.16511 14.6865 6.70967 16.5215C6.55125 17.1683 6.45884 17.8416 6.90769 18.4092C7.16511 18.7393 7.51495 19.0165 7.86478 19.2607C9.75257 20.5677 11.845 21.0759 14.1288 20.7723C15.8318 20.5479 17.3235 19.8548 18.6371 18.7591C19.0529 18.4158 19.2443 17.9538 19.2443 17.4191C19.2443 15.4521 17.7064 13.6898 15.746 13.5182C14.8219 13.4257 13.878 13.4984 12.9407 13.4984ZM8.95389 7.55116C8.95389 9.72937 10.7361 11.5182 12.9143 11.5248C15.0991 11.5314 16.9077 9.72277 16.8945 7.54455C16.8813 5.35314 15.1057 3.58416 12.9209 3.59076C10.7361 3.59736 8.96049 5.36634 8.95389 7.55116Z"
                      fill={`${account_dropdown ? "#E74216" : "#000"}`}
                    />
                  </svg>
                  <span
                    className="d-none d-sm-block menu-link"
                    style={{
                      color: `${
                        account_dropdown ? "hsl(13, 83%, 50%)" : "#000"
                      }`,
                    }}
                  >
                    Account
                  </span>
                  {account_dropdown && (
                    <div className="dropdown-inner px-4 py-2">
                      <Link className="dropdown-item py-1" to="/profile">
                        <CgProfile
                          className="me-3"
                          style={{ fontSize: "22px" }}
                        />{" "}
                        My Profile
                      </Link>
                      <Link className="dropdown-item py-1" to="/Oder">
                        <BsFillCartPlusFill
                          className="me-3"
                          style={{ fontSize: "22px" }}
                        />
                        My Orders
                      </Link>
                      <Link
                        className="dropdown-item py-1"
                        onClick={() => {
                          setShow(!false);
                        }}
                      >
                        <MdOutlineRateReview
                          className="me-3"
                          style={{ fontSize: "22px" }}
                        />
                        Add Testimonial
                      </Link>
                      <Link
                        className="dropdown-item py-1"
                        onClick={() => setlogin(true)}
                      >
                        <FiLogOut
                          className="me-3"
                          style={{ fontSize: "22px" }}
                        />
                        Logout
                      </Link>
                    </div>
                  )}
                </span>
              )} */}
            </div>
          </div>
        </div>
      </header>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Please tell people how great we are :</h6>
          <div className="form-floating">
            <textarea
              type="date"
              className="form-control"
              id="floatingInputValue"
              placeholder="Enter Text Here..."
              style={{ minHeight: "90px" }}
              onChange={(e) => {
                setReviews(e.target.value !== "" ? true : false);
              }}
            />
            <label htmlFor="floatingInputValue">Enter Text Here...</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              if (Reviews === true) {
                setShow(false);
              }
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
