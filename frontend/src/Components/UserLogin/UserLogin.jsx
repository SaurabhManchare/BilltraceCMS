import React, { useState } from "react";
import "./UserLogin.css";
import { loginanimation } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlinePassword } from "react-icons/md";
import Navbar from "../Navbar/Navbar";

const UserLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    User_Roleid: 2,
    Mobile_No: "",
    User_Password: "",
  });
  const [error, setError] = useState("");
  const [passwordChange, setPasswordchange] = useState({
    Mobile_No: "",
    User_NewPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_API + "Login",
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("UserID", user._id);
        localStorage.setItem("LoginUserName", user.User_Name);

        // Navigate based on the user's role
        switch (user.User_Roleid) {
          case 1:
            navigate("/AdminPage");
            break;
          case 2:
            navigate("/ClientPage");
            break;
          case 3:
            navigate("/SysEnggDashbord");
            break;
          default:
            setError("Invalid role");
        }
      } else {
        setError("Login failed, please check your credentials.");
      }
    } catch (error) {
      setError("Login failed, please check your credentials.");
    }
  };

  const passwordchangedata = (e) => {
    const { name, value } = e.target;
    setPasswordchange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Changepassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_API + "ResetPassword",
        passwordChange 
      );
      if (response.status === 200) {
      
        alert("Password changed successfully");
      } else {
        setError("Password change failed, please try again.");
      }
    } catch (error) {
      setError("Password change failed, please try again.");
    }
  };



  return (
    <>
    <Navbar/>
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 shadow-lg p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex justify-content-center">
              <div className="w-20 overflow-hidden rounded-circle shadow">
                <img
                  src={loginanimation}
                  className="img-fluid UserRegistrationGif"
                  alt=""
                />
              </div>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                name="User_Roleid"
                value={formData.User_Roleid}
                onChange={handleChange}
                aria-label="Select Role"
              >
                <option value={1}>Admin</option>
                <option value={2}>Client</option>
                <option value={3}>Supporting</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control text-center bg-light border-1"
                placeholder="Phone"
                name="Mobile_No"
                value={formData.Mobile_No}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <div className="input-group px-1 py-1 bg-light rounded mt-1 mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control text-center bg-light border-1"
                  placeholder="Password"
                  name="User_Password"
                  value={formData.User_Password}
                  onChange={handleChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-danger SignupButton">
                Login
              </button>
            </div>
          </form>

          {error && (
            <p className="text-danger d-flex justify-content-center">{error}</p>
          )}

          <p className="d-flex justify-content-start mt-3">
            Forgot Password ?{" "}
            <Link
              to=""
              className="text-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              &nbsp; &nbsp;
              <MdOutlinePassword size={30} />
            </Link>
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Change Password
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={Changepassword}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter User ID"
                          name="Mobile_No"
                          onChange={passwordchangedata}
                          value={passwordChange.Mobile_No}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="New Password"
                          name="User_NewPassword"
                          onChange={passwordchangedata}
                          value={passwordChange.User_NewPassword}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </p>
            <div className="d-flex justify-content-end">
              <h6 style={{ color: "#bb2d3b" }}>SuppEngg</h6>

              <div>
                <br />
                <p>
                  <a
                    href={`tel:${9380814972}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileCall(9380814972);
                    }}
                    style={{ display: "block", color: "black" }}
                  >
                    <b>Mo: 9380814972</b>
                  </a>
                  <a
                    href={`tel:${9763474734}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileCall(9763474734);
                    }}
                    style={{ display: "block", color: "black" }}
                  >
                    <b>Mo: 9763474734</b>
                  </a>
                  <a
                    href={`tel:${8660095376}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileCall(8660095376);
                    }}
                    style={{ display: "block", color: "black" }}
                  >
                    <b>Mo: 8660095376</b>
                  </a>
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserLogin;
