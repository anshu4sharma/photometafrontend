import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Saidbar.scss";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { BiCertification } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { IoCloseSharp, IoNotificationsSharp } from "react-icons/io5";
import logo from "../../assets/1111.png";

import { FiLogIn } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
function Saidbar({ setstep, subpage, step }) {
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
  const sidebarmenu = [
    {
      id: "1",
      name: "Upload-PDF",
      icon: MdOutlineDashboard,
      navigat: "/admin/dashboard",
    },
    {
      id: "2",
      name: "All Tickets",
      icon: MdOutlineDashboard,
      navigat: "/admin/suport",
    },
    {
      id: "3",
      name: "Upload picture",
      icon: MdOutlineDashboard,
      navigat: "/admin/Upload-picture",
    },
    {
      id: "4",
      name: "All Users",
      icon: MdOutlineDashboard,
      navigat: "/admin/allusers",
    },
    {
      id: "5",
      name: "Avatar purchased",
      icon: MdOutlineDashboard,
      navigat: "/admin/AvatarbuyUsers",
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

  const Menu = () => {
    return sidebarmenu.map((e, i) => {
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
          className={`sidebar-wrapper ${!said && "toggled"} `}
          style={{ backgroundColor: "#3B3C3C" }}
        >
          <div className="sidebar-content">
            <div className="sidebar-menu p-3">
              <ul
                className="pt-2 mx-4"
                style={{ listStyle: "none", padding: "0" }}
              >
                <Menu />
              </ul>
            </div>
          </div>
        </nav>
        {subpage}
      </div>
    </div>
  );
}

export default Saidbar;
//background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("your_image.png");
