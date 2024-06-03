import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const defaultData = {
  Outlet_name: "",
  Address: "",
  Mobile_No: "",
  Outlet_Status: ""
};

const UpdateOutlate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outlateData, setOutlateData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutlateData(prevData => ({ ...prevData, [name]: value }));
  };

  const fetchOutlateData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_API + `outlateMaster/outlates/${id}`);
      setOutlateData(response.data.data); // Access response.data.data to get the outlate data
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchOutlateData();
  }, [id]); 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(process.env.REACT_APP_SERVER_API + `outlateMaster/outlates/${id}`, outlateData);
      console.log("Data successfully updated");
      navigate("/ShowOutlate");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-4 shadow p-3 mb-5 bg-body rounded">
          <h3>Update Outlet</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Outlet Name"
                name="Outlet_name"
                value={outlateData.Outlet_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="Address"
                value={outlateData.Address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="Mobile_No"
                value={outlateData.Mobile_No}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                name="Outlet_Status"
                value={outlateData.Outlet_Status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOutlate;
