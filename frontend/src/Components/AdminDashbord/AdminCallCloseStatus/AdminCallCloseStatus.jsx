import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./AdminCallCloseStatus.css";

const AdminCallCloseStatus = () => {
  const [outlateItems, setOutlateItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getOutlateData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}CallCloseStatus`
      );
      if (response.data.success) {
        // Reverse the array of items before setting the state
        const reversedItems = response.data.data.reverse();
        setOutlateItems(reversedItems);
      }
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    getOutlateData();
  }, []);

  const handleMobileCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  const handleModalOpen = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const csvData = [
    [
      "CallClose User",
      "CallCloseUser Mobile No",
      "Restaurant Name",
      "Address",
      "Restaurant MobileNo",
      "Call Type",
      "Call Status",
      "Date & Time",
      "Support Engg",
      "Call Complete",
      "Date & Time",
      "Call Close",
      "Date & Time",
      "How To Solve Call",
    ],
  ];
  outlateItems.forEach((item) => {
    csvData.push([
      item.UserId.User_Name,
      item.UserId.Mobile_No,
      item.OutletId.Outlet_name,
      item.OutletId.Address,
      item.OutletId.Mobile_No,
      item.Call_Id.CallsType,
      item.Call_Id.Call_Status,
      item.Call_Id.Date,
      item.SupportEnggCallId.SupportEnggName,
      item.SupportEnggCallId.SupportEnggCall_Status,
      item.SupportEnggCallId.CategoryCreatedDate,
      item.CallCloseStatus,
      item.CallCloseDate,
      item.SupportEnggCallId.howtosolveinformation,
    ]);
  });

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col">
            <div className="shadow-lg p-3 mb-5 bg-body rounded">
              <div className="d-flex justify-content-end">
                <CSVLink data={csvData} className="btn btn-primary mb-2">
                  Download CSV
                </CSVLink>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Outlet Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Date & Time</th>
                      <th>Support Engg</th>
                      <th>Call Status</th>
                      <th>Call Close Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outlateItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.UserId.User_Name}</td>
                        <td>{item.OutletId.Outlet_name}</td>
                        <td>{item.OutletId.Address}</td>
                        <td>
                          <text
                            href={`tel:${item.UserId.Mobile_No}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleMobileCall(item.UserId.Mobile_No);
                            }}
                          >
                            {item.UserId.Mobile_No}
                          </text>
                        </td>
                        <td>{item.CallCloseDate}</td>
                        <td>{item.SupportEnggName}</td>
                        <td>
                          <button className="btn btn-warning">
                            {item.SupportEnggCallId.SupportEnggCall_Status}
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleModalOpen(item)}
                          >
                            {item.CallCloseStatus}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {selectedItem && (
        <div
          className="modal fade show modelwidth"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <h6>Restaurant Name</h6>
                  <h5>{selectedItem.OutletId.Outlet_name}</h5>
                  <hr />

                  <h5>Call Details</h5>
                  <br />
                  <h3>{selectedItem.Call_Id.CallsType}</h3>
                  <p>{selectedItem.Call_Id.Problem}</p>

                  <div className="list-inline items d-flex justify-content-between">
                    <b>CallClose User</b>
                    <b>SupportEngg</b>
                  </div>
                  <div className="list-inline items d-flex justify-content-between mt-1">
                    <p> {selectedItem.UserId.User_Name}</p>
                    <p>{selectedItem.SupportEnggName}</p>
                  </div>
                  <div className="list-inline items d-flex justify-content-between">
                    <p
                      href={`tel:${selectedItem.UserId.Mobile_No}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileCall(selectedItem.UserId.Mobile_No);
                      }}
                    >
                      Mobile No :{selectedItem.UserId.Mobile_No}
                    </p>
                    <text
                      href={`tel:${selectedItem.SupportEnggCallId.SupportEnggMobileNo}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileCall(
                          selectedItem.SupportEnggCallId.SupportEnggMobileNo
                        );
                      }}
                    >
                      Mobile No:{" "}
                      {selectedItem.SupportEnggCallId.SupportEnggMobileNo}
                    </text>
                  </div>
                  <div className="">
                    <div className="horizontal-timeline">
                      <ul className="list-inline items d-flex justify-content-between">
                        <li className="list-inline-item items-list">
                          <p
                            className="py-1 px-2 rounded text-white btn btn-primary"
                            // style={{ backgroundColor: "#f37a27" }}
                          >
                            {selectedItem.Call_Id.Call_Status}
                          </p>
                          <br />
                          {selectedItem.Call_Id.Date}
                        </li>
                        <li className="list-inline-item items-list">
                          <p
                            className="py-1 px-2 rounded text-white"
                            style={{ backgroundColor: "#f37a27" }}
                          >
                            Processing
                          </p>
                          {selectedItem.AdminToSupportEngg_id.Date}
                        </li>
                        <li className="list-inline-item items-list">
                          <p
                            className="py-1 px-2 rounded text-white btn btn-warning"
                            // style={{ backgroundColor: "#f37a27" }}
                          >
                            {
                              selectedItem.SupportEnggCallId
                                .SupportEnggCall_Status
                            }
                          </p>
                          <br />
                          {selectedItem.SupportEnggCallId.CategoryCreatedDate}
                        </li>
                        <li className="list-inline-item items-list">
                          <p
                            className="py-1 px-2 rounded text-white btn btn-primary"
                            // style={{ backgroundColor: "#f37a27" }}
                          >
                            {selectedItem.CallCloseStatus}
                          </p>
                          <br />
                          {selectedItem.CallCloseDate}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="m-2">
                <h6>How To Solve:</h6>
                <p>{selectedItem.SupportEnggCallId.howtosolveinformation}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCallCloseStatus;
