import React, { useState } from "react";
import { NavbarLogo } from "../../../assets";
import "./SupportEnggNavbar.css";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";

const SupportEnggNavbar = () => {
  const [showMenu , setShowMenu] = useState(false);

  const handelShowMenu = () => {
  setShowMenu(preve => !preve)
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light shadow-lg mb-5 bg-body rounded">
        <div class="container">
          <Link className="navbar-brand" to="/SuppEngCallsShow">
            <img
              src={NavbarLogo}
              className="img-fluid SupportEnggNavbarLogo"
              alt="..."
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <HiOutlineUserCircle size={30} />
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/SuppEngCallsShow"
                >
                  New Calls
                </Link>
              </li>
              <li className="nav-item">
                <span className="count-message-span">
                  <h6 className="text-center mb-4 message-count">
                    {localStorage.getItem("SupportEnggCurrentDateCall")}
                  </h6>
                </span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/SuppEnggAllCalls"
                >
                  All Date Calls
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/SupportEnggCallStatus"
                >
                  Call Status
                </Link>
              </li>
              <li class="nav-item m-2">
              <div onClick={handelShowMenu}>
             <div className="handelShowMenuicon" >
              <HiOutlineUserCircle size={30}/>
              </div>
          {
            showMenu &&  <div class="container custom-container">
            <div class="custom-dropdown">
              <p>UserName : {localStorage.getItem('LoginUserName')}</p>
              <Link className="nav-link text-dark text-center" to="/">
                <b><i>Logout</i></b>
              </Link>
           
            </div>
            </div>
          }
          </div>

              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SupportEnggNavbar;
