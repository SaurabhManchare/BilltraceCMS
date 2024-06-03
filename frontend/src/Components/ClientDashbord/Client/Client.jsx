import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ClientNavbar from "../ClientNavbar/ClientNavbar";

const Client = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [callTypeButtons, setCallTypeButtons] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
    console.log("Selected category:", category);
  };

  const getCallTypeData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "NewCallCategery/Categery"
      );
      const categories = response.data.data.map(category => category.newCallCategoryName);
      setCallTypeButtons(categories);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };
  
  useEffect(() => {
    getCallTypeData();
  }, []);

  return (
    <>
    <ClientNavbar/>
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="row">
            {callTypeButtons.map((category, index) => (
              <div key={index} style={{ width: "50%" }}>
                <Link to="/HardWareCall">
                  <button
                    style={{ width: "80%" }}
                    className="col btn btn-primary m-3"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <div className="row d-flex justify-content-end">
        <div className="" style={{ width: "50%" }}>
            <Link to="/ClientHelp"
                    style={{ width: "80%" }}
                    className="col btn btn-success m-3"
                  >
                   Help
                  </Link>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Client;
