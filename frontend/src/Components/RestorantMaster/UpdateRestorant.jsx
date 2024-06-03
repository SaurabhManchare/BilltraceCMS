import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const defaultData = {
  Rest_Name: "",
  Address: "",
  Mobile_No: "",
  Rest_Status: "" 
}

const UpdateRestorant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateRestorant, setUpdateRestorant] = useState(defaultData);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateRestorant(prevState => ({ ...prevState, [name]: value }));
  };

  const updateRestorantData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_API + `restorantMaster/restaurants/${id}`);
      setUpdateRestorant(response.data.data); 
      setLoading(false); // Update loading state
    } catch (error) {
      setError(error); // Update error state
      setLoading(false); // Update loading state
    }
  };

  useEffect(() => {
    updateRestorantData();
  }, [id]); 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(process.env.REACT_APP_SERVER_API + `restorantMaster/restaurants/${id}`, updateRestorant);
      console.log("Data successfully updated");
      navigate("/ShowRestorant");
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error); // Update error state
    }
  };

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>Error: {error.message}</p>; // Display error message if there's an error

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-4 shadow p-3 mb-5 bg-body rounded">
          <h3>Update Restaurant</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Restaurant Name"
                name="Rest_Name"
                value={updateRestorant.Rest_Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="Address"
                value={updateRestorant.Address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="Mobile_No"
                value={updateRestorant.Mobile_No}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                name="Rest_Status"
                value={updateRestorant.Rest_Status}
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

export default UpdateRestorant;
