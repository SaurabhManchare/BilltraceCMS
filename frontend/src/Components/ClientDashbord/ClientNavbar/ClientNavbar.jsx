import React, { useState } from "react";
import { NavbarLogo } from "../../../assets";
import "./ClientNavbar.css";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";

const ClientNavbar = () => {
  const [showMenu , setShowMenu] = useState(false);

  const handelShowMenu = () => {
  setShowMenu(preve => !preve)
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light shadow-lg mb-5 bg-body rounded">
        <div class="container">
          <Link className="navbar-brand" to="/Client">
            <img
              src={NavbarLogo}
              className="img-fluid ClientNavbarLogo"
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
            <span >
            <HiOutlineUserCircle size={30}/>
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
           
                 
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/CallStatus">
                  Call Status
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/ClinetCallCloseStatus">
                  CallClose Status
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

export default ClientNavbar;


