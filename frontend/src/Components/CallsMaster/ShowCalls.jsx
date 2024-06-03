import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const ShowCalls = () => {
  const [outlateItems, setOutlateItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [selectedOutlateId, setSelectedOutlateId] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const getOutlateData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}CallsMaster/Calls`);
      if (response.data.success) {
        const fetchedData = response.data.data || [];
        const reversedData = fetchedData.reverse();
        setOutlateItems(reversedData);
      }
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}userdata`);
      const supportEnggUsers = response.data.data.filter(
        (user) => user.User_Roleid === 3
      );
      setUserData(supportEnggUsers || []);
    } catch (error) {
      console.error("Error Fetching User Data", error);
    }
  };

  useEffect(() => {
    getOutlateData();
    fetchUserData();
    setCurrentDate(getCurrentDate());
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleUserChange = (event) => {
    const selectedUser = userData.find(
      (user) => user.User_Name === event.target.value
    );
    setSelectedUserId(selectedUser ? selectedUser._id : "");
    setSelectedUsername(event.target.value);
  };

  const handleCallClick = (callId, outlateId) => {
    setSelectedCallId(callId);
    setSelectedOutlateId(outlateId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCallId || !selectedUserId || !selectedOutlateId) {
      console.error("Selected user, call, or outlate not found");
      return;
    }
    const data = {
      UserId: selectedUserId,
      Call_Id: selectedCallId,
      OutletId: selectedOutlateId,
      // Add other attributes as needed
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}AdminToSupportEngg/AdminToSupportEngg`,
        data
      );
      console.log("Response:", response.data);
      // Handle successful response, e.g., show success message
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show error message
    }
  };

  const handleMobileCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  // Filter outlateItems based on current date
  const filteredOutlateItems = outlateItems.filter(item => item.Date.includes(currentDate));

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <div className="row shadow-lg p-3 mb-5 bg-body rounded">
          <div className="col">
            <div className="table-responsive">
              <h5 className="text-end">{currentDate}</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Outlet Name</th>
                    <th>Call Type</th>
                    <th>Problem</th>
                    <th>Problem Type</th>
                    <th>wright text</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Image</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOutlateItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.OutletId.Outlet_name}</td>
                      <td>{item.CallsType}</td>
                      <td>{item.Product}</td>
                      <td>{item.Problem}</td>
                      <td>{item.TextArea}</td>
                      <td>{item.OutletId.Address}</td>
                      <td>
                        <text
                          href={`tel:${item.OutletId.Mobile_No}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileCall(item.OutletId.Mobile_No);
                          }}
                        >
                          {item.OutletId.Mobile_No}
                        </text>
                      </td>
                      <td>
                        {item.PhotoVideo ? (
                          <img
                            src={item.PhotoVideo}
                            className="img-fluid"
                            alt="Item Image"
                            data-bs-toggle="modal"
                            data-bs-target={`#exampleModal-${item._id}`}
                            style={{ height: "30px", cursor: "pointer" }}
                          />
                        ) : (
                          <div
                            style={{
                              backgroundColor: "lightgray",
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        )}
                      </td>
                      <td>{item.Date}</td>
                      <td>
                        <button
                          className={`btn ${
                            item.Call_Status === "Active"
                              ? "btn-success"
                              : "btn-danger"
                          }`}
                        >
                          {item.Call_Status}
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleCallClick(item._id, item.OutletId._id)
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Call
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Image Model */}
        {outlateItems.map((item) => (
          <div
            key={item._id}
            className="modal fade"
            id={`exampleModal-${item._id}`}
            tabIndex="-1"
            aria-labelledby={`exampleModalLabel-${item._id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-body"
                  id={`exampleModalLabel-${item._id}`}
                >
                  <img
                    src={item.PhotoVideo}
                    className="img-fluid"
                    alt="Item Image"
                    style={{ height: "330px", width: "100%" }}
                    data-bs-dismiss="modal"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Call Model */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Assign Support Engineer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userSelect" className="form-label">
                      Select Support Engineer
                    </label>
                    <select
                      id="userSelect"
                      className="form-select"
                      onChange={handleUserChange}
                      value={selectedUsername}
                    >
                      <option value="" disabled>
                        Select Support Engineer
                      </option>
                      {userData.map((user) => (
                        <option key={user._id} value={user.User_Name}>
                          {user.User_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCalls;
