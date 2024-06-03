import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HardWareCall = () => {
  const navigate = useNavigate();
  const [hardWareCall, setHardWareCall] = useState({
    UserId: "",
    RestorantId: "",
    OutletId: "",
    Product: "",
    TextArea: "",
    PhotoVideo: "", // This will store base64 representation of the image
    CallsType: localStorage.getItem("selectedCategory") || "",
    Problem: "",
  });

  const [subTypes, setSubTypes] = useState([]);
  const [subSubTypes, setSubSubTypes] = useState([]);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [userWiseRestAndOutlet, setUserWiseRestAndOutlet] = useState([]);

  useEffect(() => {
    getSubSubData();
    getCallTypeData();
    UserWiseRestAndOutlet();
  }, []);

  const getSubSubData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "NewCallSubSubCategery/SubSubCategery"
      );
      setSubSubTypes(response.data.data);
    } catch (error) {
      console.error("Error Fetching SubSub Data", error);
    }
  };

  const getCallTypeData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "NewCallSubCategery/SubCategery"
      );
      setSubTypes(response.data.data);
    } catch (error) {
      console.error("Error Fetching Sub Data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "PhotoVideo") {
      // Handle file selection and conversion to base64
      const reader = new FileReader();
      reader.onload = () => {
        setHardWareCall((prevState) => ({
          ...prevState,
          PhotoVideo: reader.result, // Store base64 representation of the image
        }));
      };
      reader.readAsDataURL(files[0]); // Convert selected file to base64
    } else {
      setHardWareCall((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (name === "Product") {
        setSelectedSubType(value);
        setHardWareCall((prevState) => ({
          ...prevState,
          Problem: "", // Reset the selected problem when the product changes
        }));
      }

      if (name === "Problem") {
        localStorage.setItem("selectedProblem", value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        process.env.REACT_APP_SERVER_API + "CallsMaster/Calls",
        hardWareCall
      );
      console.log("Data submitted successfully!");
      setHardWareCall({
        ...hardWareCall,
        Product: "",
        TextArea: "",
        PhotoVideo: "", // Reset the image after submission
      });
      localStorage.removeItem("selectedCategory");
      navigate("/ClientPage");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const UserWiseRestAndOutlet = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "UserWiseRestAndOutlet/UserWiseRestAndOutlet"
      );
  
      if (response.data.data.length > 0) {
        const userDataForCurrentUser = response.data.data.find((item) => 
          item.UserId && item.UserId._id === localStorage.getItem("UserID")
        );
  
        if (userDataForCurrentUser) {
          setHardWareCall((prevState) => ({
            ...prevState,
            UserId: userDataForCurrentUser.UserId ? userDataForCurrentUser.UserId._id : "",
            RestorantId: userDataForCurrentUser.RestorantId ? userDataForCurrentUser.RestorantId._id : "",
            OutletId: userDataForCurrentUser.OutletId ? userDataForCurrentUser.OutletId._id : "",
          }));
        } else {
          console.log("User data not found for the current user.");
        }
      }
      setUserWiseRestAndOutlet(response.data.data || []);
    } catch (error) {
      console.error("Error Fetching Outlet Data", error);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 shadow p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">{localStorage.getItem("selectedCategory") || ""}</h3>
            <select
              className="form-select mt-3"
              onChange={handleChange}
              name="Product"
              value={hardWareCall.Product}
            >
              <option value="">Select Problem Type</option>
              {subTypes
                .filter(
                  (subType) =>
                    subType.newCallCategoryID.newCallCategoryName ===
                    localStorage.getItem("selectedCategory")
                )
                .map((subType) => (
                  <option
                    key={subType._id}
                    value={subType.newCallSubCategoryName}
                  >
                    {subType.newCallSubCategoryName}
                  </option>
                ))}
            </select>

            {selectedSubType && (
              <select
                className="form-select mt-3"
                onChange={handleChange}
                name="Problem"
                value={hardWareCall.Problem}
              >
                <option value="">Select Problem</option>
                {subSubTypes
                  .filter(
                    (subSubType) =>
                      subSubType.newCallSubCategoryID &&
                      subSubType.newCallSubCategoryID.newCallSubCategoryName ===
                        selectedSubType
                  )
                  .map((subSubType) => (
                    <option
                      key={subSubType._id}
                      value={subSubType.newCallSubSubCategoryName}
                    >
                      {subSubType.newCallSubSubCategoryName}
                    </option>
                  ))}
              </select>
            )}

            <div className="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Text Area"
                onChange={handleChange}
                name="TextArea"
                value={hardWareCall.TextArea}
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Other</label>
            </div>
            <div className="mb-3 mt-2">
              <label className="form-label">Upload Photo/Video</label>
              <input
                type="file"
                className="form-control"
                onChange={handleChange}
                name="PhotoVideo"
                accept="image/*,video/*"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HardWareCall;
