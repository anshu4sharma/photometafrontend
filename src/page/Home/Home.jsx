import React, { useState } from "react";
import "./Home.scss";
import logo from "../../assets/1111.png";
import newbob from "../../assets/pngaaa.com-204454.png";
import { useNavigate } from "react-router-dom";
import siadimg from "../../assets/4 Yoshiko D.png";
import siadimg1 from "../../assets/1 argos (1).png";
import step1 from "../../assets/invitation (2).png";
import step2 from "../../assets/add-friend (1).png";
import step3 from "../../assets/camera (1).png";
import step4 from "../../assets/step-4.png";
import step5 from "../../assets/step-5.png";
import step6 from "../../assets/step-6.png";
import step7 from "../../assets/step-7.png";
import dossier from "../../assets/dossier (1).png";
import argos from "../../assets/5 legendo X.png";
import bunny from "../../assets/bunny-color.png";
import fire from "../../assets/fire (1).png";
import pentox from "../../assets/pentox.png";
import Slider from "react-slick";
import Accordion from "../../components/Accordion/Accordion";
import coinmarketcap from "../../assets/coinmarketcap-seeklogo 1.png";
import new1 from "../../assets/IMG_5113 1.png";
import photometa from "./photometa.pdf";
import lomon from "../../assets/3 lomon S.jpg";
import Partners1 from "../../assets/Partners/BSCSCAN.png";
import Partners2 from "../../assets/Partners/cmm logo.png";
import Partners3 from "../../assets/Partners/COINGECKO.png";
// import Partners4 from "../../assets/Partners/COINSTORE.png";
import Partners5 from "../../assets/Partners/DEXSCREENER.png";
import Partners6 from "../../assets/Partners/DEXTOOL.png";
import Partners7 from "../../assets/Partners/METAMASK.png";
import Partners8 from "../../assets/Partners/PANCAKESWAP.png";
import Partners9 from "../../assets/Partners/TRUST.png";
import Partners10 from "../../assets/Partners/UNISWAP.png";
import Partners11 from "../../assets/Partners/WALLETCONNECT.png";
import Partners12 from "../../assets/Partners/NOMICS.png";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import { BsTelegram, BsYoutube } from "react-icons/bs";
import { AiFillInstagram, AiFillMediumCircle } from "react-icons/ai";
import { SiDiscord, SiLinktree } from "react-icons/si";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../components/Header/Header.scss";
import { HiMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import newtokenomics from "../../assets/newtokenomics.png";
import { Modal } from "react-bootstrap";

highcharts3d(Highcharts);
const BASECOINGEKO = "https://api.coingecko.com/api/v3";

// import { Formik, Form } from "formik";

function Home() {
  const [coinstList, setCoinstList] = useState([]);
  const [Reviews, setReviews] = useState(false);
  const [open, setopen] = useState(false);
  const [parth, setparth] = useState("/");
  const [account_dropdown, setaccount_dropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [login, setlogin] = useState(true);
  const [arbrop, setarbrop] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setarbrop(false);
  const div1 = React.useRef();
  const div2 = React.useRef();
  const div3 = React.useRef();
  const div4 = React.useRef();
  const div5 = React.useRef();
  useEffect(() => {
    loadCoinsList();
    localStorage.setItem("reff", location.pathname?.split("/")[1]);
    localStorage.removeItem("login");
  }, []);
  let percentageChange = (data) => {
    let value = parseFloat(data?.market_cap_change_percentage_24h).toFixed(2);
    return value > 0 ? `+${value}` : value;
  };
  function smoothScroll(target) {
    const { top } = target.getBoundingClientRect();
    window.scrollTo({
      top: top + window.pageYOffset,
      behavior: "smooth",
    });
  }
  let priceValue = (price) => {
    let value = parseFloat(price).toFixed(2);
    return value;
  };
  const loadCoinsList = async () => {
    axios
      .get(
        `${BASECOINGEKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`
      )
      .then((response) => {
        setCoinstList(response.data);
        newcoin();
      })
      .catch((e) => {});
  };
  const newcoin = () => {
    axios
      .get(`https://app.geckoterminal.com/api/p1/bsc/pools/0xba16cca747980fd2f3267fa583ccff34924eea34?include=dex%2Cdex.network.explorers%2Cnetwork_link_services%2Ctoken_link_services%2Cdex_link_services&base_token=0`)
      .then((response) => {
        console.log(response);
        // setCoinstList((data) => {
        //   if (data?.id !== "arabella") {
        //     return [...data, response.data];
        //   } else {
        //     return data;
        //   }
        // });
      })
      .catch((e) => {});
  };
  const options = {
    chart: {
      style: {
        fontFamily: "monospace",
        color: "rgba(150, 22, 234, 0.31) !important",
      },
      type: "pie",
      backgroundColor: "transparent",
      options3d: {
        enabld: true,
        alpha: -35,
        beta: 0,
      },
    },
    colors: [
      "#008",
      "#FF6500",
      "#BF6520",
      "#FFC92B",
      "#A460FB",
      "#D4545B",
      "#96A45B",
    ],
    title: {
      text: "",
    },
    tooltip: {
      headerFormat: "",
      backgroundColor: "rgba(0,0,0,0.6)",
      pointFormat: "<b className='new'>{point.name}</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        shadow: false,
        depth: 85,
        dataLabels: {
          colors: "#000",
          enabled: true,
          format: "<b className='new'>{point.name}</b>",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Tokenomics",
        data: [
          ["Burn 50%", 50],
          ["minting 30%", 30.0],
          ["DEX 5%", 5.0],
          ["CEX 5%", 5.0],
          ["MKT 5%", 5.0],
          ["Collab 2.5%", 2.5],
          ["Dev 2.5%", 2.5],
        ],
      },
    ],
  };
  const settings = {
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: !true,
    dots: !true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
    ],
  };
  const settings1 = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    arrows: !true,
    dots: !true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
    ],
  };
  const settings11 = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    arrows: !true,
    dots: !true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
    ],
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
    // {
    //   question: "Can you rent the Cameras?",
    //   answer: `Unfortunately its not available for now.`,
    // },
    // {
    //   question: "Will it be possible to mint NFTs?",
    //   answer: `Unfortunately its not available for now.`,
    // },
  ];

  return (
    <>
      <header className="header" style={{ background: "#0c0c0d" }}>
        <div className="container">
          <div className="navbar-2">
            <div
              className="burger d-black d-xl-none"
              id="burger"
              onClick={() => setopen(!open)}
            >
              {!open ? (
                <HiMenu className="text-light" style={{ fontSize: 25 }} />
              ) : (
                <IoCloseSharp className="text-light" style={{ fontSize: 25 }} />
              )}
            </div>
            <div className="brand my-3">
              <img
                src={logo}
                alt=""
                className="img-fluid"
                width={120}
                height={120}
              />
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
                    {!open ? (
                      <HiMenu className="text-light" style={{ fontSize: 25 }} />
                    ) : (
                      <IoCloseSharp
                        className="text-light"
                        style={{ fontSize: 25 }}
                      />
                    )}
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
                      smoothScroll(div1.current);
                    }}
                  >
                    Home{" "}
                  </span>
                </li>
                <li
                  className="menu-item px-1"
                  onClick={() => {
                    setopen(!open);
                    smoothScroll(div2.current);
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
                    smoothScroll(div3.current);
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
                    fetch(photometa).then((response) => {
                      response.blob().then((blob) => {
                        // Creating new object of PDF file
                        const fileURL = window.URL.createObjectURL(blob);
                        // Setting various property values
                        let alink = document.createElement("a");
                        alink.href = fileURL;
                        alink.download = "photomrta.pdf";
                        alink.click();
                      });
                    });
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
                    smoothScroll(div5.current);
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
            </div>
          </div>
        </div>
      </header>
      <div className="mainBody" style={{ background: "#0c0c0d" }}>
        <div className="container-fluid p-0" ref={div1}>
          <div className="main_slider" style={{ paddingTop: "85px" }}>
            <div className="container">
              <div className="row w-100 m-auto main">
                <div className="col-12 col-md-6 leftsiad d-flex align-items-center">
                  <div className="">
                    <h1 className="main-heading mt-5  pb-5">
                      convert your <br />
                      mobile camera
                      <br /> into
                      <span style={{ color: "#A460FB" }}> NFT</span>
                    </h1>
                    <p
                      className="pb-4"
                      style={{ color: "#A460FB", fontWeight: 300 }}
                    >
                      Start clicking pictures and earn photometa tokens
                    </p>
                    <div className="d-sm-flex">
                      <button
                        className="Login w-50 my-2 px-4 w-100 me-3 py-2 d-flex align-items-center justify-content-start "
                        onClick={() => {
                          fetch(photometa).then((response) => {
                            response.blob().then((blob) => {
                              // Creating new object of PDF file
                              const fileURL = window.URL.createObjectURL(blob);
                              // Setting various property values
                              let alink = document.createElement("a");
                              alink.href = fileURL;
                              alink.download = "photomrta.pdf";
                              alink.click();
                            });
                          });
                        }}
                      >
                        <p className="m-0 px-2">Whitepaper</p>
                        <img
                          src={dossier}
                          alt=""
                          width={30}
                          className="img-fluid mx-2"
                        />
                      </button>
                      <button className="Login w-50 my-2 px-4 w-100 me-3 py-2 d-flex align-items-center justify-content-start ">
                        <a
                          href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xD03008E8A6BA9DE12195858210A6E93b9d3Db06E"
                          target="_blank"
                          className="d-flex align-items-center justify-content-start "
                        >
                          <p className="m-0 text-light">Buy&nbsp;on&nbsp;pancakeswap</p>
                          <img
                            src={bunny}
                            alt=""
                            width={30}
                            className="img-fluid mx-2"
                          />
                        </a>
                        {/* <a
                        href="https://bscscan.com/address/0xA94a557950B0A3810fe904DFf87fc1D341D1227C"
                        target="_blank"
                        className="Login w-50 my-2 px-3 w-100 me-3 py-2 d-flex align-items-center justify-content-start "
                      >
                        <p className="m-0">Buy&nbsp;on&nbsp;pancakeswap</p>
                        <img
                          src={bunny}
                          alt=""
                          width={30}
                          className="img-fluid mx-2"
                        />
                        <a/> */}
                      </button>
                    </div>

                    <div className="d-sm-flex ">
                      <a
                        href="https://bscscan.com/token/0xD03008E8A6BA9DE12195858210A6E93b9d3Db06E"
                        target="_blank"
                        className="Login w-50 my-2 px-3 w-100 me-3 py-2 d-flex align-items-center justify-content-start "
                      >
                        <p className="m-0 px-2">Contract&nbsp;address</p>
                        <img
                          src={newbob}
                          alt=""
                          width={30}
                          className="img-fluid mx-2"
                        />
                      </a>
                      <a
                        href="https://bscscan.com/address/0x248aa87908620Ae4688b64726B54fB411293DAD0"
                        target="_blank"
                        className="Login w-50 my-2 px-3 w-100 me-3 py-2 d-flex align-items-center justify-content-start "
                      >
                        <p className="m-0 px-2">Burn&nbsp;address</p>
                        <img
                          src={fire}
                          alt=""
                          width={30}
                          className="img-fluid mx-2"
                        />
                      </a>
                    </div>

                    <div className="d-sm-flex ">
                      <a
                        href=""
                        target="_blank"
                        className="Login my-2 px-3 w-100 me-3 py-2 d-flex align-items-center justify-content-center new-but"
                      >
                        <p className="m-0 px-2">Presale(soldout)</p>
                        <img
                          src={require("../../assets/acquisition.png")}
                          alt=""
                          width={30}
                          className="img-fluid mx-2"
                        />
                      </a>
                    </div>
                    <div className="d-flex pt-2">
                      <p className="d-flex align-items-center text-light">
                        Photometa will be Listed on{" "}
                        <img src={coinmarketcap} className="ms-2" />{" "}
                        <img src={new1} className="mx-2" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 d-md-block d-none">
                  <div className="siadimgs">
                    <img src={siadimg1} alt="" className="img-fluid siadimg1" />
                    <img src={siadimg} alt="" className="img-fluid siadimg" />
                  </div>
                </div>
                <div className="col-12 col-md-6 d-md-none d-block pt-4 pb-5">
                  <div className="row">
                    <div className=" col-6">
                      <img
                        src={siadimg1}
                        alt=""
                        className="img-fluid pb-sm-0 w-100"
                      />
                    </div>
                    <div className="col-6">
                      <img
                        src={siadimg}
                        alt=""
                        className="img-fluid pt-sm-0  w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-1 py-5" ref={div2}>
              <div
                className="row mt-lg-5 "
                style={{ background: "#0F1217", borderRadius: "18px" }}
              >
                <div className="d-flex justify-content-evenly align-items-center py-5 w-50 m-auto">
                  <div className="mx-1">
                    <a href="https://t.me/photometachannel">
                      <BsTelegram className="icons" />
                    </a>
                  </div>
                  <div className="mx-1">
                    <a href="https://www.instagram.com/photometaclub/">
                      <AiFillInstagram className="icons" />
                    </a>
                  </div>
                  <div className="mx-1">
                    <a href="https://discord.gg/F6p4PJvADY">
                      <SiDiscord className="icons" />
                    </a>
                  </div>
                  <div className="mx-1">
                    <a href="https://medium.com/@photometa.club">
                      <AiFillMediumCircle className="icons" />
                    </a>
                  </div>
                  <div className="mx-1">
                    <a href="https://linktr.ee/photometaclub">
                      <SiLinktree className="icons" />
                    </a>
                  </div>
                  <div className="mx-1">
                    <a href="https://www.youtube.com/@photometa">
                      <BsYoutube className="icons" />
                    </a>
                  </div>
                </div>
                <div
                  className="col-12 py-5 px-4 p-lg-5"
                  style={{
                    borderTop: "2px solid #2C2B2B",
                    background: "#0F1217",
                    background:
                      "linear-gradient(180deg, #0F1217 5%, #0c0c0d 50%)",
                  }}
                >
                  <div
                    className="p-3 p-md-5"
                    style={{ background: "#0c0c0d", borderRadius: "16px" }}
                  >
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <img
                          src={argos}
                          alt=""
                          className="img-fluid pe-0 d-block m-auto pe-lg-5 pt-md-5 "
                        />
                      </div>
                      <div className="col-12 col-lg-6 py-4 py-lg-5">
                        <div className="Tital py-3 py-lg-4 mt-3 px-5">
                          About Photometa
                        </div>
                        <p
                          className="text-light pt-5"
                          style={{
                            textAlign: "justify",
                          }}
                        >
                          PHOTOMETA is a Click-N-Earn web3.0 NFT app protocol on
                          PoA. We are the decentralized asset network, for
                          creating community, value and trust in digital media.
                        </p>
                        <p
                          className="text-light  py-2"
                          style={{
                            textAlign: "justify",
                          }}
                        >
                          We are on a mission to make crypto assets accessible
                          and easy to use for everyone. Our app is the next step
                          in making crypto more accessible and rewarding those
                          who put time and effort into their daily photography
                          and activities by combining habits and tech in a Web
                          3.0 NFT platform.
                        </p>
                        <button
                          className="Login px-4 m-1 py-3 my-2"
                          onClick={() => {
                            navigate("/Signin/new");
                          }}
                        >
                          Get started
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4 px-0 m-0">
          <div
            className="d-block m-auto headerIsListed"
            style={{
              background: "#222A36",
              width: "25%",
              borderRadius: "15px",
            }}
          >
            <h6
              className="text-center py-3 text-light pb-4"
              style={{ marginBottom: "-12px", fontSize: "22px" }}
            >
              <span style={{ color: "#A460FB" }}>photometa</span> partners
            </h6>
          </div>
          <div className="container-fluid" style={{ background: "#000" }}>
            <div className="container m-auto">
              <div className="row w-100 py-2 m-0">
                <div>
                  <Slider {...settings}>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners1}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners2}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center py-3">
                      <img
                        src={Partners3}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    {/* <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners4}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div> */}
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners5}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners6}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners7}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners8}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners9}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners10}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners11}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                    <div className=" d-flex justify-content-center align-items-center pt-4 mt-2">
                      <img
                        src={Partners12}
                        alt=""
                        className="img-fluid w-75 m-auto"
                      />
                    </div>
                  </Slider>
                </div>
                {/* <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center  my-3">
                <img src={binance} alt="" className="img-fluid" />
              </div>
              <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center  my-3">
                <img src={BitGo_Color_Large} alt="" className="img-fluid" />
              </div>
              <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center  my-3">
                <img src={secure} alt="" className="img-fluid" />
              </div>
              <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center my-3">
                <img src={binance} alt="" className="img-fluid" />
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <h1 className="text-center text-light py-5">
            How to earn on
            <br />
            <span style={{ color: "#A460FB" }}> photometa?</span>
          </h1>
          <div className="row px-1">
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-2">
              <div className="px-4 py-5 step1">
                <h4 className="text-light">Step1</h4>
                <p className="text-light">
                  Get an invitation code from someone who is already a Photometa
                  user or you can get it from our Telegram group.
                </p>
                <img
                  src={step1}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-2">
              <div className=" px-4 py-5 step1">
                <h4 className="text-light">Step2</h4>
                <p className="text-light">
                  Sign up for free and complete your registration on Photometa
                  with ease
                </p>
                <img
                  src={step2}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-2">
              <div className="px-4 py-5 step1">
                <h4 className="text-light">Step3</h4>
                <p className="text-light">
                  Transfer BNB into your in-app wallet to be able to buy AVATAR
                  and PM-v2 in order to use them in the project.
                </p>
                <img
                  src={step3}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-2">
              <div className="px-4 py-5 step1">
                <h4 className="text-light">Step4</h4>
                <p className="text-light">
                  Pick the Avatar NFT camera that matches your interest and
                  purchase it from the in-app marketplace.
                </p>
                <img
                  src={step4}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-2">
              <div className="px-4 py-5 step1">
                <h4 className="text-light">Step5</h4>
                <p className="text-light">
                  Take part and complete tasks and get instant rewarded.
                </p>
                <img
                  src={step5}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-2">
              <div className="px-4 py-5 step1">
                <h4 className="text-light">Step6</h4>
                <p className="text-light">
                  Equip your AVATAR with energy in order to have more features
                  and earn more rewards.
                </p>
                <img
                  src={step6}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-2">
              <div className="px-4 py-5 step1">
                <h4 className="text-light">Step7</h4>
                <p className="text-light">
                  swap out with metamask your earned tokens at any time.
                </p>
                <img
                  src={step7}
                  alt=""
                  width={40}
                  height={40}
                  className="d-block ms-auto pt-4"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5" ref={div3}>
          <h1 className="text-center text-light py-5">
            <span style={{ color: "#A460FB" }}> Photometa </span>
            marketplace
          </h1>

          <div
            className="row m-1 p-2"
            style={{
              background: "#0F1217",
              border: "1px solid #494848",
              borderRadius: "21px",
            }}
          >
            <Slider {...settings1}>
              <div className=" p-3">
                <img
                  src={argos}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "22px",
                  }}
                />
                <div
                  className=" mt-3 p-4"
                  style={{
                    maxheight: "100%",
                    height: "190px",
                    background: "rgba(41, 28, 56, 0.63)",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    className="text-light text-center"
                    style={{ fontSize: "20px" }}
                  >
                    Legendo X
                  </p>
                  <button className="BuyBtn px-4 mt-5 py-2 d-block m-auto">
                    Buy now
                  </button>
                </div>
              </div>
              <div className="p-3">
                <img
                  src={siadimg}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "20px",
                  }}
                />
                <div
                  className=" mt-3 p-4"
                  style={{
                    maxheight: "100%",
                    height: "190px",
                    background: "rgba(41, 28, 56, 0.63)",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    className="text-light text-center"
                    style={{ fontSize: "20px" }}
                  >
                    Yoshiko D
                  </p>
                  <button className="BuyBtn px-4 py-2 mt-5 d-block m-auto">
                    Buy now
                  </button>
                </div>
              </div>
              <div className="p-3">
                <img
                  src={lomon}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "22px",
                  }}
                />
                <div
                  className=" mt-3 p-4"
                  style={{
                    maxheight: "100%",
                    height: "190px",
                    background: "rgba(41, 28, 56, 0.63)",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    className="text-light text-center"
                    style={{ fontSize: "20px" }}
                  >
                    Lomon S
                  </p>
                  <button className="BuyBtn px-4 py-2 mt-5 d-block m-auto">
                    Buy now
                  </button>
                </div>
              </div>
              <div className="p-3">
                <img
                  src={pentox}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "22px",
                  }}
                />
                <div
                  className=" mt-3 p-4"
                  style={{
                    maxheight: "100%",
                    height: "190px",
                    background: "rgba(41, 28, 56, 0.63)",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    className="text-light text-center"
                    style={{ fontSize: "20px" }}
                  >
                    Pentox
                  </p>
                  <button className="BuyBtn px-4 mt-5 py-2 d-block m-auto">
                    Buy now
                  </button>
                </div>
              </div>
              <div className="p-3">
                <img
                  src={siadimg1}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "22px",
                  }}
                />
                <div
                  className=" mt-3 p-4"
                  style={{
                    maxheight: "100%",
                    height: "190px",
                    background: "rgba(41, 28, 56, 0.63)",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    className="text-light text-center"
                    style={{ fontSize: "20px" }}
                  >
                    Argos
                  </p>
                  <button className="BuyBtn px-4 py-2 mt-5 d-block m-auto">
                    Buy now
                  </button>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="container py-5">
          <h1 className="text-center text-light pt-4 pb-5">
            <span style={{ color: "#A460FB" }}> Photometa </span>
            roadmap
          </h1>
          <div className="row d-none d-lg-flex m-1 p-2">
            <div className="col-3">
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                  maxwidth: "100%",
                  width: "270px",
                }}
              >
                <ul className="px-4">
                  <li>Project Brainstorm</li>
                  <li>Project R&D</li>
                  <li>Market research</li>
                  <li>Legal Analysis</li>
                  <li>Alliances collaboration</li>
                  <li>Private sale</li>
                </ul>
              </div>
              <p className="text-center pt-5 m-0" style={{ color: "#90EE90" }}>
                Phase 1
              </p>
              <div className="d-block m-auto bottom-bot"></div>
            </div>
            <div className="col-3">
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                  maxwidth: "100%",
                  width: "270px",
                }}
              >
                <ul className="px-4">
                  <li>Web Development</li>
                  <li>Social Media</li>
                  <li>Whitepaper</li>
                  <li>Roadmap</li>
                  <li>Alpha Test</li>
                  <li>VC</li>
                </ul>
              </div>
              <p className="text-center  pt-5 m-0" style={{ color: "#90EE90" }}>
                Phase 2
              </p>
              <div className="d-block m-auto bottom-bot"></div>
            </div>
            <div className="col-3">
              <div
                className=" timeline mt-3 py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                  maxwidth: "100%",
                  width: "270px",
                }}
              >
                <ul className="px-4">
                  <li>Free Registration </li>
                  <li>Token Airdrop</li>
                  <li>NFT launch</li>
                  <li>NFT Airdrop</li>
                  <li>Big Marketing Campaign</li>
                  <li>Token & NFT Distribution</li>
                </ul>
              </div>
              <p className="text-center  pt-5 m-0" style={{ color: "#90EE90" }}>
                Phase 3
              </p>
              <div className="d-block m-auto bottom-bot"></div>
            </div>
            <div className="col-3">
              <div
                className=" timeline mt-3 py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                  maxwidth: "100%",
                  width: "270px",
                }}
              >
                <ul className="px-4">
                  <li>Token on Blockchain</li>
                  <li>Smart contract</li>
                  <li>Testnet</li>
                  <li>Beta Test</li>
                  <li>Mainnet</li>
                  <li>KOL</li>
                </ul>
              </div>
              <p className="text-center  pt-5 m-0" style={{ color: "#90EE90" }}>
                Phase 4
              </p>
              <div className="d-block m-auto bottom-bot"></div>
            </div>
            <div className="line" style={{ border: "1px solid #A460FB" }}></div>
            <div className="col-6">
              <div className="d-block mx-auto top-bot"></div>
              <p className="text-center pb-4 m-0" style={{ color: "#90EE90" }}>
                Phase 5
              </p>
              <div
                className="timeline mt-3 py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                  maxwidth: "100%",
                  width: "270px",
                }}
              >
                <ul className="px-4">
                  <li>Public sale</li>
                  <li>Token Distribution event</li>
                  <li>Private TGE</li>
                  <li>Gamma Test</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="d-block mx-auto top-bot"></div>
              <p className="text-center pb-4 m-0" style={{ color: "#ffff00" }}>
                Phase 6
              </p>
              <div
                className="timeline mt-3 py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                  maxwidth: "100%",
                  width: "270px",
                }}
              >
                <ul className="px-4">
                  <li>Project launch</li>
                  <li>DEX listing</li>
                  <li>CEX listing</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row d-flex d-lg-none m-1 p-2">
            <div className="col-12 col-sm-6">
              <p className="text-center text-light pt-5 m-0 new1">Phase 1</p>
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  color: "#90EE90",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                }}
              >
                <ul className="px-4">
                  <li>Project Brainstorm</li>
                  <li>Project R&D</li>
                  <li>Market research</li>
                  <li>Legal Analysis</li>
                  <li>Alliances collaboration</li>
                  <li>Private sale</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <p className="text-center text-light pt-5 m-0 new1">Phase 2</p>
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  color: "#90EE90",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                }}
              >
                <ul className="px-4">
                  <li>Web Development</li>
                  <li>Social Media</li>
                  <li>Whitepaper</li>
                  <li>Roadmap</li>
                  <li>Alpha Test</li>
                  <li>VC</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <p className="text-center text-light pt-5 m-0 new1">Phase 3</p>
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  color: "#90EE90",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                }}
              >
                <ul className="px-4">
                  <li>Free Registration </li>
                  <li>Token Airdrop</li>
                  <li>NFT launch</li>
                  <li>NFT Airdrop</li>
                  <li>Big Marketing Campaign</li>
                  <li>Token & NFT Distribution</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <p className="text-center text-light pt-5 m-0 new1">Phase 4</p>
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  color: "#90EE90",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                }}
              >
                <ul className="px-4">
                  <li>Token on Blockchain</li>
                  <li>Smart contract</li>
                  <li>Testnet</li>
                  <li>Beta Test</li>
                  <li>Mainnet</li>
                  <li>KOL</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <p className="text-center  pt-5 m-0" style={{ color: "#90EE90" }}>
                Phase 5
              </p>
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                }}
              >
                <ul className="px-4">
                  <li>Public sale</li>
                  <li>Token Distribution event</li>
                  <li>Private TGE</li>
                  <li>Gamma Test</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <p className="text-center pt-5 m-0" style={{ color: "#ffff00" }}>
                Phase 6
              </p>
              <div
                className=" mt-3 timeline py-4 d-block m-auto"
                style={{
                  maxheight: "100%",
                  height: "190px",
                  background: "rgba(41, 28, 56, 0.63)",
                  borderRadius: "16px",
                }}
              >
                <ul className="px-4">
                  <li>Project launch</li>
                  <li>DEX listing</li>
                  <li>CEX listing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <h1 className="text-center text-light pt-4 pb-5">
            Get latest market <br /> updates on
            <span style={{ color: "#A460FB" }}> Photometa </span>
          </h1>
          <div className="row w-100 py-5 m-0">
            <div
              className="row m-1 py-4 px-0 mx-0"
              style={{
                background: "rgba(41, 28, 56, 0.63)",
                background: "linear-gradient(180deg, #0E0D0F 0%, #1e1e1e 100%)",
                borderRadius: "21px",
              }}
            >
              <Slider {...settings11}>
                {coinstList &&
                  coinstList.map((data, i) => {
                    return (
                      <div key={data?.id} className="coin-img px-5">
                        {/* <div className="p-0 md:p-6 rounded-md"> */}
                        <div className="bg-[#1f232e] rounded-[20px] p-6 md:p-4 lg:p-8 grid grid-row-4 gap-1">
                          <img
                            src={data?.image}
                            className="rounded-full w-10"
                            alt=""
                            width={40}
                          />
                          <div className="grid grid-cols-6">
                            <div className="mt-4 col-span-4 text-light d-flex align-items-center">
                              {data?.name}{" "}
                              <div
                                className={`mx-3 p-2 ${
                                  percentageChange(data) < 0
                                    ? "bg-danger"
                                    : " bg-success"
                                }`}
                                style={{
                                  borderRadius: "14px",
                                }}
                              >
                                {" "}
                                {percentageChange(data)}%
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 text-light">
                            {priceValue(data?.current_price)} USD
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
        <div className="container-fluid pb-0 pb-md-5">
          <div className="container Tokenomics py-5">
            <h1 className="text-center text-light py-5">Tokenomics</h1>
            <div className="py-5">
              <img
                src={newtokenomics}
                alt=""
                className="img-fluid newImg d-block m-auto"
              />
            </div>
          </div>
        </div>
        <div className="container-fluid accordionHeading">
          <div className="container">
            <h1 className="text-left` text-light py-5">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
        <div className="container">
          <Accordion questionsAnswers={questionsAnswers} light={"dark"} />
        </div>
      </div>
      <div className="" ref={div5}></div>
      {/* <Modal
        show={!show}
        onHide={() => setShow(!false)}
        size="lg"
      >
        <Modal.Header >
        </Modal.Header>
        <Modal.Body>
          <img
            src={require("../../assets/WhatsApp Image 2023-02-02 at 4.00.53 PM.jpeg")}
            alt=""
          />
        </Modal.Body>
      </Modal> */}
    </>
  );
}

export default Home;
