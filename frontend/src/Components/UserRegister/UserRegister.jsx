import React, { useState , useEffect } from "react";
import "./UserRegister.css";
import { loginanimation } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../../utility/ImagetoBase64";
import axios from "axios";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const UserRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRegisterData, setUserRegisterData] = useState({
    image: "",
    User_Name: "",
    Mobile_No: "",
    User_Email: "",
    User_Roleid: "", 
    User_Password: "",
    confirmPassword: ""
  });
  const [roleData , setRoleData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadProfileImage = async (e) => {
    const userRegisterData = await ImagetoBase64(e.target.files[0]);
    setUserRegisterData((prev) => ({
      ...prev,
      image: userRegisterData,
    }));
  };

  const getRoleData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "RoleMaster/Role"
      );
      setRoleData(response.data.data); 
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    getRoleData();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { User_Name, Mobile_No, User_Email, User_Password, confirmPassword, User_Roleid } = userRegisterData;
    if (!User_Name || !Mobile_No || !User_Email || !User_Password || !confirmPassword || !User_Roleid) {
      setErrorMessage("Please enter all fields");
    } else if (User_Password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match");
    } else {
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_API + "Signup", userRegisterData);
        setErrorMessage("Successfully registered");
        navigate("/");
        console.log("Response data:", response.data);
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 shadow-lg p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex justify-content-center">
              <div className="position-relative w-20 overflow-hidden rounded-circle shadow">
                <img
                  src={userRegisterData.image ? userRegisterData.image : loginanimation}
                  className="img-fluid UserRegistrationGif "
                  alt=""
                />
                <label htmlFor="profileimage">
                  <div className="position-absolute bottom-0 h-1/3 bg-slate-500 profileimage w-100 text-center" style={{ cursor: "pointer" }}>
                    <p className="text-sm p-1 text-white">Upload</p>
                  </div>
                  <input
                    type="file"
                    style={{ width: "10px" }}
                    accept="image/*"
                    onChange={handleUploadProfileImage}
                    className="hidden"
                    id="profileimage"
                  />
                </label>
              </div>
            </div>
            <div className="mb-3 mt-5">
              <input
                type="text"
                className="form-control text-center bg-light border-1"
                placeholder="User Name"
                name="User_Name"
                value={userRegisterData.User_Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mt-5">
              <input
                type="text"
                className="form-control text-center bg-light border-1"
                placeholder="Mobile Number"
                name="Mobile_No"
                value={userRegisterData.Mobile_No}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mt-5">
              <input
                type="text"
                className="form-control text-center bg-light border-1"
                placeholder="Enter Email"
                name="User_Email"
                value={userRegisterData.User_Email}
                onChange={handleChange}
              />
            </div>
           
            <div className="mb-3">
            <select
                className="form-select"
                name="User_Roleid"
                value={userRegisterData.User_Roleid}
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value="">Select Role</option>
                {roleData.map(role => (
                  <option key={role._id} value={role.Role_id}>{role.Role_Name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <div className="input-group px-1 py-1 bg-light rounded mt-1 mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control text-center bg-light border-1"
                  placeholder="Password"
                  name="User_Password"
                  value={userRegisterData.User_Password}
                  onChange={handleChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={handleShowPassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group px-1 py-1 bg-light rounded mt-1 mb-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control text-center bg-light border-1"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={userRegisterData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-danger SignupButton">
                Sign up
              </button>
            </div>
          </form>
          <p className="d-flex justify-content-start mt-3 text-danger">
            {errorMessage}
          </p>
          <p className="d-flex justify-content-start mt-3">
            Already have an Account?{" "}
            <Link to="/" className="text-danger">
              &nbsp;Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserRegister;
