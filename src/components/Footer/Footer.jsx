import React from "react";
import "./Footer.scss";
import logo from "../../assets/photometa NO BG PNG.png";
import { HiPhoneMissedCall } from "react-icons/hi";
import { FaFacebook, FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsTelegram, BsYoutube } from "react-icons/bs";
import { RiTwitterFill } from "react-icons/ri";
import { AiFillInstagram, AiFillMediumCircle } from "react-icons/ai";
import { SiDiscord, SiLinktree } from "react-icons/si";
import { Link } from "react-router-dom";

import photometa from "../../page/Home/photometa.pdf";
function Footer() {
  return (
    <>
      <div
        className="container-fluid"
        style={{ background: "rgb(27, 27, 29)" }}
      >
        <div className="container  p-sm-1">
          <div className="row py-5">
            <div className="col-12 col-sm-6 col-lg-4  py-1">
              <h4 className="text-light pb-3">Photometa</h4>
              <p className="text-muted" style={{ fontWeight: "600" }}>
                <Link
                  to="PrivacyPolicy"
                  className="text-muted"
                  style={{ fontWeight: "600" }}
                >
                  Privacy policy
                </Link>
              </p>
              <p className="text-muted" style={{ fontWeight: "600" }}>
                <Link
                  to="RiskDisclaimerPolicy"
                  className="text-muted"
                  style={{ fontWeight: "600" }}
                >
                  Risk Disclaimer Policy
                </Link>
              </p>
              <p className="text-muted" style={{ fontWeight: "600" }}>
                <Link
                  to="tnc"
                  className="text-muted"
                  style={{ fontWeight: "600" }}
                >
                  Terms & conditions
                </Link>
              </p>
            </div>
            <div className="col-12 col-sm-6 col-lg-4  py-1">
              <h4 className="text-light text-md-center pb-3">Contact us</h4>
              <p
                className="text-muted d-md-flex justify-content-center"
                style={{ fontWeight: "600" }}
              >
                info@photometa.club
              </p>
            </div>
            <div className="col-12 col-sm-6 col-lg-4  py-1">
              <h4 className="text-light text-md-end pb-3">Community</h4>
              <div className="d-flex  justify-content-md-end align-items-end">
                <div className="mx-1">
                  <a href="t.me/photometachannel">
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
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ background: "rgb(12 12 13)" }}>
        <div className="container py-2">
          <h6
            className="text-center text-muted m-0"
            style={{ fontWeight: "400", lineHeight: "25px", color: "#fff" }}
          >
            Copyright © 2022{" "}
            <span style={{ color: "#A460FB" }}>Photometa club</span>
          </h6>
        </div>
      </div>
    </>
  );
}

export default Footer;
