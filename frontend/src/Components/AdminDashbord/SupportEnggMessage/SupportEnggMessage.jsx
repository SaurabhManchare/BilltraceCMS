import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const SupportEnggMessage = () => {
  const [supportEnggCalls, setSupportEnggCalls] = useState([]);

  const fetchSupportEnggCalls = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/SupportEngg`);
      if (response.data.success) {
        // Reverse the array of support engineering calls before setting the state
        const reversedCalls = response.data.data.reverse();
        setSupportEnggCalls(reversedCalls);
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

  return (
    <>
      <AdminNavbar/>
      <div className="container mt-5">
        <div className="row shadow-lg p-3 mb-5 bg-body rounded">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Support Engg</th>
                    <th>Mobile No</th>
                    <th>Outlet Name</th>
                    <th>Problem</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supportEnggCalls.map((call) => (
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
                      <td>{call.textAreaReasons}</td>
                      <td>
                        <button
                          className={`btn ${
                            call.SupportEnggCall_Status === "Call Accepted"
                              ? "btn-primary"
                              : call.SupportEnggCall_Status === "Call Not Accepted"
                              ? "btn-danger"
                              : call.SupportEnggCall_Status === "Call Resolve"
                              ? "btn-warning"
                              : "btn-secondary" 
                          }`}
                        >
                          {call.SupportEnggCall_Status}
                        </button>
                      </td>
                      <td>
                        {call.SupportEnggCall_Status === "Call Resolve" && (
                          <Link to={`/AdminCallClose/${call._id}`} className="btn btn-success">
                            Call Close
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportEnggMessage;
