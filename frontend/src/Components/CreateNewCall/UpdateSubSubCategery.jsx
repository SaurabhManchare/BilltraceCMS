import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const defaultValue = {
  newCallSubSubCategoryName: "",
};

const UpdateSubSubCategery = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract id from route parameters
  const [newCallSubSubCategory, setNewCallSubSubCategory] = useState(defaultValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_API + `NewCallSubSubCategery/SubSubCategery/${id}`);
        setNewCallSubSubCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching call data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(process.env.REACT_APP_SERVER_API + `NewCallSubSubCategery/SubSubCategery/${id}`, newCallSubSubCategory);
      console.log("Call updated successfully");
      navigate("/ShowNewCall");
    } catch (error) {
      console.error("Error updating call:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCallSubSubCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                placeholder="Call Sub Type"
                name="newCallSubSubCategoryName"
                value={newCallSubSubCategory.newCallSubSubCategoryName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Update Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   </>
  );
};

export default UpdateSubSubCategery;


