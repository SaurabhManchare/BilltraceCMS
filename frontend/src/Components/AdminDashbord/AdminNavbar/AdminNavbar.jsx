import React, { useState } from "react";
import { NavbarLogo } from "../../../assets";
import "./AdminNavbar.css";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";

const AdminNavbar = () => {
  const [showMenu , setShowMenu] = useState(false);

  const handelShowMenu = () => {
  setShowMenu(preve => !preve)
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light shadow-lg mb-5 bg-body rounded">
        <div class="container">
          <Link className="navbar-brand" to="/ShowCalls">
            <img
              src={NavbarLogo}
              className="img-fluid AdminNavbarLogo"
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
            <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Create User
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to="/UserRegister">
                      Create User
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/ShowRestorant">
                      Create Restaurant
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/ShowOutlate">
                      Create Outlate
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/CreateUserWiseRestOutlet">
                    CreateUserWiseRest&Outlate
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                   Create New Calls
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to="/ShowNewCall">
                    Create New Calls
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/HelpButtonDataShow">
                       Upload Video
                    </Link>
                  </li>
                </ul>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/CallsHistory">
                  Show All Calls
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/SupportEnggMessage">
                  SupportEngg Message
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/AdminCallCloseStatus">
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

export default AdminNavbar;
