import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupportEnggNavbar from "../SupportEnggNavbar/SupportEnggNavbar";
import "./CallsShow.css"


const CallsShow = () => {
  const [newCallData, setNewCallData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [callCount, setCallCount] = useState(0);
  localStorage.setItem('SupportEnggCurrentDateCall', callCount);

  useEffect(() => {
    const fetchNewCallData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API}AdminToSupportEngg/AdminToSupportEngg`
        );
        if (response.data.success) {
          const filteredData = response.data.data.filter(
            (item) => item.UserId && item.UserId._id === localStorage.getItem("UserID")
          );
          const reversedData = filteredData.reverse();
          setNewCallData(reversedData);
          setCurrentDate(getCurrentDate());
          const currentDateData = reversedData.filter(item => item.Date.includes(currentDate));
          setCallCount(currentDateData.length); 
        } else {
          console.error("Fetch failed: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching calls data:", error);
      }
    };

    fetchNewCallData();
  }, [currentDate]); 

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleMobileCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  const filteredOutlateItems = newCallData.filter(item => item.Date.includes(currentDate));

  return (
    <>
      <SupportEnggNavbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 shadow-lg p-3 mb-5 bg-body rounded"> 
            <div className="table-responsive">
            <h5 className="text-end">{currentDate}</h5>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>Outlet Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Problem</th>
                    <th>wright text</th>
                    <th>Date</th>
                    <th>Image</th>
                    <th>User Name</th>
                    <th>Call Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOutlateItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.OutletId.Outlet_name}</td>
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
                      <td>{item.Call_Id.Problem}</td>
                      <td>{item.Call_Id.TextArea}</td>
                      <td>{item.Date}</td>
                      <td>
                        {item.Call_Id.PhotoVideo ? (
                          <img
                            src={item.Call_Id.PhotoVideo}
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
                      <td>{item.UserId.User_Name}</td>
                      <td>
                        <button
                          className={`btn ${
                            item.Call_Id.Call_Status === "Active"
                              ? "btn-success"
                              : "btn-danger"
                          }`}
                        >
                          {item.Call_Id.Call_Status}
                        </button>
                      </td>
                      <td>
                        <Link
                          className="btn btn-primary"
                          to={`/CallAccept/${item._id}`}
                        >
                          Call Accept
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Image Model */}
        {filteredOutlateItems.map((item) => (
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
                
                <div className="modal-body" id={`exampleModalLabel-${item._id}`}>
                  <img
                    src={item.Call_Id.PhotoVideo}
                    className="img-fluid"
                    alt="Item Image"
                    style={{ height: "330px" , width: "100%" }}
                    data-bs-dismiss="modal"
                  />
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CallsShow;
