import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams hook
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const defaultValue = {
  newCallCategoryName: "",
};

const UpdateNewCall = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract id from route parameters
  const [newCallCategory, setNewCallCategory] = useState(defaultValue);

  useEffect(() => {
    // Fetch data for the specified id when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_API + `NewCallCategery/Categery/${id}`);
        setNewCallCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching call data:", error);
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency to re-fetch data when it changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(process.env.REACT_APP_SERVER_API + `NewCallCategery/Categery/${id}`, newCallCategory); // Corrected URL
      console.log("Call updated successfully:", response.data);
      navigate("/ShowNewCall")
    } catch (error) {
      console.error("Error updating call:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCallCategory({ ...newCallCategory, [name]: value });
  };

  return (
    <>
    <AdminNavbar/>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-4 shadow-lg p-3 mb-5 bg-body rounded">
            <h3>Update Call</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Call Type"
                  name="newCallCategoryName"
                  value={newCallCategory.newCallCategoryName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Update Call</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default UpdateNewCall;
