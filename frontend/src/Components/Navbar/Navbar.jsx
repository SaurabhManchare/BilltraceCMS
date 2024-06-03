import React, { useState } from "react";
import "./Navbar.css";
import { NavbarLogo } from "../../assets";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu , setShowMenu] = useState(false);

  const handelShowMenu = () => {
  setShowMenu(preve => !preve)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-lg mb-5 bg-body rounded">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={NavbarLogo} className="img-fluid NavbarLogo" alt="..." />
        </Link>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Link
              </Link>
            </li> */}
          </ul>
          {/* <form className="d-flex">
          <div onClick={handelShowMenu}>
             <div className="handelShowMenuicon" >
              <HiOutlineUserCircle size={30}/>
              </div>
          {
            showMenu &&  <div class="container custom-container">
            <div class="custom-dropdown">
            <Link className="nav-link text-dark" to="/">
                Admin
              </Link>
              <Link className="nav-link text-dark" to="/">
              UserRegister
              </Link>
              <Link className="nav-link text-dark" to="/">
                Login
              </Link>
           
            </div>
            </div>
          }
              
            
          </div>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
