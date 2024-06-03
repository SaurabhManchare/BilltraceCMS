import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClientNavbar from "../ClientNavbar/ClientNavbar";

const CallStatus = () => {
  const [supportEnggCalls, setSupportEnggCalls] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("3"); 

  const fetchSupportEnggCalls = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "SupportEngg"
      );
      if (response.data.success) {
        const userId = localStorage.getItem("UserID");
        const filteredData = response.data.data.filter(
          (item) => item.Call_Id.UserId && item.Call_Id.UserId === userId
        );
       
        const reversedData = filteredData.reverse();
        setSupportEnggCalls(reversedData);
      }
    } catch (error) {
      console.error("Error Fetching Support Engineering Calls", error);
    }
  };

  useEffect(() => {
    fetchSupportEnggCalls();
  }, []);

  const handleMobileCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <ClientNavbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 shadow-lg p-3 mb-5 bg-body rounded">
            <div className="table-responsive">
              <div className="d-flex justify-content-end">
                <select
                  className="form-select mb-3 text-center"
                  style={{ width: "50%" }}
                  aria-label="Default select example"
                  onChange={handleStatusChange}
                >
                   <option value="3">Call Resolve</option>
                  <option value="2">Call Accepted</option>
                 
                </select>
              </div>

              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th scope="col">Support Engg</th>
                    <th scope="col">Mobile No</th>
                    <th scope="col">Outlet Name</th>
                    <th scope="col">Problem</th>
                    <th scope="col">Date</th>
                    <th scope="col">Call Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supportEnggCalls.map((call) => {
                    if (
                      (selectedStatus === "2" &&
                        call.SupportEnggCall_Status === "Call Accepted") ||
                      (selectedStatus === "3" &&
                        call.SupportEnggCall_Status === "Call Resolve")
                    ) {
                      return (
                        <tr key={call._id}>
                          <td>{call.UserId.User_Name}</td>
                          <td>
                            <text
                              href={`tel:${call.UserId.Mobile_No}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMobileCall(call.UserId.Mobile_No);
                              }}
                            >
                              {call.UserId.Mobile_No}
                            </text>
                          </td>
                          <td>{call.OutletId.Outlet_name}</td>
                          <td>{call.Call_Id.Problem}</td>
                          <td>{call.CategoryCreatedDate}</td>
                          <td>
                            <button
                              className={`btn ${
                                call.SupportEnggCall_Status === "Call Accepted"
                                  ? "btn-primary"
                                  : call.SupportEnggCall_Status ===
                                    "Call Resolve"
                                  ? "btn-warning"
                                  : ""
                              }`}
                            >
                              {call.SupportEnggCall_Status}
                            </button>
                          </td>
                          {call.SupportEnggCall_Status === "Call Resolve" && (
                            <td>
                              <Link
                                to={`/CallClose/${call._id}`}
                                className="btn btn-success"
                              >
                                Call Close
                              </Link>
                            </td>
                          )}
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallStatus;
