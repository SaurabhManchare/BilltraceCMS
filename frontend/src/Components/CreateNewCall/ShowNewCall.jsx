import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const ShowNewCall = () => {
  const [newCallCategory, setNewCallCategory] = useState([]);
  const [newCallSubCategory, setNewCallSubCategory] = useState([]);
  const [newCallSubSubCategory, setNewCallSubSubCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_API + "NewCallCategery/Categery");
        setNewCallCategory(response.data.data);
      } catch (error) {
        console.error("Error Fetching Call Category Data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_API + "NewCallSubCategery/SubCategery");
        setNewCallSubCategory(response.data.data);
      } catch (error) {
        console.error("Error Fetching SubCategory Data:", error);
      }
    };

    fetchSubCategoryData();
  }, []);

  useEffect(() => {
    const fetchSubSubCategoryData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_API + "NewCallSubSubCategery/SubSubCategery");
        setNewCallSubSubCategory(response.data.data);
      } catch (error) {
        console.error("Error Fetching SubSubCategory Data:", error);
      }
    };

    fetchSubSubCategoryData();
  }, []);

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="d-flex justify-content-end">
            <Link className="btn btn-primary" to="/CreateNewCall">
              Create New Calls
            </Link>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4>Call Type</h4>
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newCallCategory.map((item, index) => (
                      <tr key={index}>
                        <td>{item.newCallCategoryName}</td>
                        <td>
                          <Link
                            to={`/UpdateNewCall/${item._id}`}
                            className="btn btn-primary m-1"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <h4>Call Sub Type</h4>
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newCallSubCategory.map((item, index) => (
                      <tr key={index}>
                        <td>{item.newCallSubCategoryName}</td>
                        <td>
                          <Link
                            to={`/UpdateSubCategery/${item._id}`}
                            className="btn btn-primary m-1"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <h4>Call SubSub Type</h4>
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newCallSubSubCategory.map((item, index) => (
                      <tr key={index}>
                        <td>{item.newCallSubSubCategoryName}</td>
                        <td>
                          <Link
                            to={`/UpdateSubSubCategery/${item._id}`}
                            className="btn btn-primary m-1"
                          >
                            Edit
                          </Link>
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
    </div>
    </>
  );
};

export default ShowNewCall;
