import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Saidbar.scss";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { MdOutlineDashboard, MdSupportAgent } from "react-icons/md";
import {  BiCertification } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { IoCloseSharp, IoNotificationsSharp } from "react-icons/io5";
import { VscReferences } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
// import Loading from "../../components/Loading";
import logo from "../../assets/1111.png";

import { FiLogIn } from "react-icons/fi";
import {  HiMenu } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";
import { SiKhanacademy } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { IoMdCloudUpload } from "react-icons/io";
// import Login from "../Login/index"
function Saidbar({ setstep, step }) {
  const [parth, setparth] = useState("/Deshboard");
  const navigate = useNavigate();
  const location = useLocation();
  const [click, setclick] = useState(false);
  const [Id, setid] = useState(0);
  const [said, setsaid] = useState(window.innerWidth < 992);

  const Role = [1, 2, 3].includes(
    JSON.parse(localStorage.getItem("logindata")) &&
      JSON.parse(localStorage.getItem("logindata"))?.RoleID
  );
  useEffect(() => {
    setparth(location.pathname);
    setsaid(window.innerWidth < 992);
  }, [location, window.innerWidth]);
  const sidebarmenu1 = [
    {
      id: "1",
      name: "Dashboard",
      icon: MdOutlineDashboard,
      navigat: "/Dashboard",
    },
    {
      id: "2",
      name: "Acquire Avatars",
      icon: BsCartPlus,
      navigat: "/Avatars",
    },
    {
      id: "3",
      name: "Referrals",
      icon: VscReferences,
      navigat: "/referrals",
    },
    {
      id: "4",
      name: "Academy",
      icon: SiKhanacademy,
      navigat: "/Academy",
    },
    {
      id: "5",
      name: "Support",
      icon: MdSupportAgent,
      navigat: "/support",
    },
    {
      id: "5",
      name: "Profile",
      icon: CgProfile,
      navigat: "/Profile",
    },
    {
      id: "6",
      name: "Upload picture",
      icon: IoMdCloudUpload,
      navigat: "/Upload/picture",
    },
  ];
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

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

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
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
  useEffect(() => {
    clearTimer(getDeadTime());
  }, [timer === "00:00:00"]);
  const Menu1 = () => {
    return sidebarmenu1.map((e, i) => {
      return (
        <div key={i}>
          {e.submenu ? (
            <div>
              <li
                className={`sidebar-dropdown py-1 ${Id}`}
                onClick={() => {
                  if (Id === e.id) {
                    setid(0);
                  } else {
                    setid(e.id);
                  }
                }}
              >
                <Link to={e.navigat}>
                  <span className="d-flex align-items-center ">
                    <e.icon
                      style={{ fontSize: "20px" }}
                      className="text-light"
                    />
                    <h6
                      className="mx-3 my-0 text-light"
                      style={{ fontSize: "14px" }}
                    >
                      {e.name}
                    </h6>
                  </span>
                  {Id === e.id ? (
                    <GoChevronDown
                      style={{ fontSize: "18px" }}
                      className="text-light"
                    />
                  ) : (
                    <GoChevronRight
                      style={{ fontSize: "18px" }}
                      className="text-light"
                    />
                  )}
                </Link>
              </li>
              {e.submenu.map((menu, i) => {
                return (
                  <div
                    className="sidebar-submenu "
                    style={{ display: `${Id === e.id ? "block" : "none"}` }}
                    key={i}
                    onClick={() => {
                      if (step) {
                        setstep(!true);
                      }
                    }}
                  >
                    <ul className="p-0" style={{ listStyle: "none" }}>
                      <li
                        className={`ps-5 ${
                          parth === menu.navigat && "MenuActive "
                        }`}
                      >
                        <Link
                          to={menu.navigat}
                          className=""
                          style={{ padding: "12px 0px" }}
                          onClick={() => {
                            setsaid(window.innerWidth < 992);
                          }}
                        >
                          <span className="d-flex align-items-center">
                            <BiCertification
                              style={{ fontSize: "14px", color: "#fff" }}
                            />
                            <h6
                              className="mx-2 my-0 text-light"
                              style={{ fontSize: "14px" }}
                            >
                              {menu.name}
                            </h6>
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            <li
              className={`py-1 ${parth === e.navigat && "MenuActive"}`}
              onClick={() => {
                setid(!true);
                if (step) {
                  setstep(!true);
                }
              }}
            >
              <Link
                to={e.navigat}
                onClick={() => {
                  setsaid(window.innerWidth < 992);
                }}
              >
                <span className="d-flex align-items-center">
                  <e.icon style={{ fontSize: "18px" }} className="text-light" />
                  <h6
                    className="mx-3 my-0 text-light"
                    style={{ fontSize: "14px" }}
                  >
                    {e.name}
                  </h6>
                </span>
              </Link>
            </li>
          )}
        </div>
      );
    });
  };
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  return (
    <div>
      <div
        className="row px-4 m-0"
        style={{ height: "10vh", background: "rgba(217, 217, 217, 0.44)" }}
      >
        <div className="d-flex justify-content-between align-items-center h-100">
          <div
            className="burger d-lg-none"
            id="burger"
            onClick={() => {
              setsaid(!said);
              setclick(!click);
            }}
          >
            {said ? (
              <HiMenu className="text-dark" style={{ fontSize: 25 }} />
            ) : (
              <IoCloseSharp className="text-dark" style={{ fontSize: 25 }} />
            )}
          </div>
          <div className="d-flex  justify-content-between align-items-center ">
            <img
              src={logo}
              alt=""
              className="img-fluid"
              width={120}
              height={120}
            />
          </div>
          <div>
            <button
              className="hedar-user d-none d-lg-inline"
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
            <IoNotificationsSharp
              style={{ fontSize: "26px" }}
              className="mx-1 mx-sm-3"
            />
            <button
              className="hedar-user d-none d-lg-inline"
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "1px solid #474749",
                padding: "10px 12px",
                borderRadius: "26px",
              }}
              onClick={() => {
                navigate("/Profile");
              }}
            >
              <FaUserCircle style={{ fontSize: "23px" }} className="me-sm-3" />
              {JSON.parse(localStorage.getItem("login")) &&
                JSON.parse(localStorage.getItem("login"))["data"]["customer"][
                  "username"
                ]}
            </button>
            <FiLogIn
              style={{ fontSize: "26px" }}
              className="mx-1 mx-sm-3"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
      <div
        className={`page-wrapper chiller-theme `}
        style={{
          overflowX: "hidden",
        }}
      >
        <nav
          id="sidebar"
          className={`sidebar-wrapper ${!said && "toggled"}`}
          style={{ backgroundColor: "#3B3C3C" }}
        >
          <div
            className="sidebar-content"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="sidebar-menu p-3 pb-5 mb-5">
              <ul
                className="pt-2 mx-4"
                style={{ listStyle: "none", padding: "0" }}
              >
                <Menu1 />
              </ul>
            </div>
            <div className="pt-md-4">
              <div className="pt-5 mt-5">
                <div
                  className="p-4 m-4"
                  style={{
                    background: "#313232",
                    borderRadius: "11px",
                  }}
                >
                  <p className="text-light text-center">
                    Time left for daily closing
                  </p>
                  <div
                    className="px-4 py-3"
                    style={{
                      background: "#252626",
                      borderRadius: "11px",
                    }}
                  >
                    <h6 className="text-light text-center m-0">
                      <b>
                        {24 - h}Hr: {60 - m}Min: {60 - s}Sec
                      </b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Suspense
          fallback={
            <div className="body">
              <div id="loading-wrapper">
                <div id="loading-text">LOADING</div>
                <div id="loading-content"></div>
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Saidbar;
//background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("your_image.png");
