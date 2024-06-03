import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CallAcceptfile = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const navigate = useNavigate();

  const [supportEnggCallData, setSupportEnggCallData] = useState({
    UserId: localStorage.getItem("UserID") || "",
    OutletId: "",
    Call_Id: "", // corrected typo
    AdminToSupportEngg_id: id,
    SupportEnggName:"",
    SupportEnggMobileNo:"",
    SupportEnggCall_Status: "",
    textAreaReasons: "",
    howtosolveinformation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API}AdminToSupportEngg/AdminToSupportEngg/${id}`
        );

        if (response.data.success && response.data.data) {
          const data = response.data.data; // Extract data object from the response

          // Extract necessary fields from the data
          const { OutletId, Call_Id, Call_Status , UserId } = data; // corrected typo

          // Update the state with the extracted data
          setSupportEnggCallData({
            ...supportEnggCallData,
            OutletId: OutletId._id,
            Call_Id: Call_Id._id,
            SupportEnggName:UserId.User_Name,
            SupportEnggMobileNo:UserId.Mobile_No,
            SupportEnggCall_Status: Call_Status || "", // Initialize Call_Status if available
          });
        } else {
          console.error("Data not found:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [id]); // Trigger useEffect when id changes

  const handleSubmitSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}SupportEngg`,
        supportEnggCallData
      );
      console.log("POST request successful:", response.data);
      // Reset form data after successful submission
      setSupportEnggCallData({
        UserId: localStorage.getItem("UserID") || "",
        OutletId: "",
        AdminToSupportEngg_id: id,
        Call_Id: "", 
        SupportEnggName:"",
        SupportEnggMobileNo:"",
        SupportEnggCall_Status: "",
        textAreaReasons: "",
        howtosolveinformation:"",
      });
      navigate("/SuppEngCallsShow");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSupportEnggCallData({
      ...supportEnggCallData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 shadow-lg p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmitSubmit}>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="SupportEnggCall_Status"
                value={supportEnggCallData.SupportEnggCall_Status}
                onChange={handleOnChange}
                aria-label="Select Call Status"
                required
              >
                <option value="">Select Status</option>
                <option value="Call Accepted">Call Accepted</option>
                <option value="Call Not Accepted">Call Not Accepted</option>
                <option value="Call Resolve">Call Resolve</option>
              </select>
              <label htmlFor="SupportEnggCall_Status">Select Call Status</label>
            </div>
            {supportEnggCallData.SupportEnggCall_Status === "Call Not Accepted" && (
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="textAreaReasons"
                  name="textAreaReasons"
                  value={supportEnggCallData.textAreaReasons}
                  onChange={handleOnChange}
                  required
                ></textarea>
                <label htmlFor="textAreaReasons">Reasons Why Not Accept Call</label>
              </div>
            )}
             {supportEnggCallData.SupportEnggCall_Status === "Call Resolve" && (
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="howtosolveinformation"
                  name="howtosolveinformation"
                  value={supportEnggCallData.howtosolveinformation}
                  onChange={handleOnChange}
                  required
                ></textarea>
                <label htmlFor="howtosolveinformation">How To Solve Information</label>
              </div>
            )}
            <div className="modal-footer d-flex justify-content-center">
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

export default CallAcceptfile;
