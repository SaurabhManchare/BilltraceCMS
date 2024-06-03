import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const AdminCallClose = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [callCloseData, setCallCloseData] = useState({
    UserId: localStorage.getItem("UserID") || "",
    OutletId: "",
    Call_Id: "", // Initialize Call_Id as empty string
    SupportEnggCallId: id,
    AdminToSupportEngg_id: "",
    SupportEnggName: "",
    CallCloseStatus: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API}/SupportEngg/${id}`
        );

        if (response.data.success && response.data.data) {
          const { OutletId, Call_Status, UserId, Call_Id, AdminToSupportEngg_id } = response.data.data;

          // Set SupportEnggName, OutletId, Call_Id, AdminToSupportEngg_id, and CallCloseStatus in the state
          setCallCloseData({
            ...callCloseData,
            OutletId: OutletId?._id || "",
            SupportEnggName: UserId?.User_Name || "",
            AdminToSupportEngg_id: AdminToSupportEngg_id?._id || "",
            Call_Id: Call_Id?._id || "", // Set Call_Id if available
            CallCloseStatus: Call_Status || "",
          });
        } else {
          console.error("Data not found:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Trigger useEffect when id changes

  const handleSubmitSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/CallCloseStatus`,
        callCloseData
      );
      console.log("POST request successful:", response.data);
      // Reset form data after successful submission
      setCallCloseData({
        ...callCloseData,
        SupportEnggName: "",
        CallCloseStatus: "",
        AdminToSupportEngg_id: ""
      });
      navigate("/AdminCallCloseStatus");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCallCloseData({
      ...callCloseData,
      [name]: value,
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4 shadow-lg p-3 mb-5 bg-body rounded">
            <form onSubmit={handleSubmitSubmit}>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  name="CallCloseStatus"
                  value={callCloseData.CallCloseStatus}
                  onChange={handleOnChange}
                  aria-label="Select Call Status"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Call Close">Call Close</option>
                </select>
                <label htmlFor="CallCloseStatus">Select Call Status</label>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCallClose;
