import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const ShowRestorant = () => {
  const [restorantItems, setRestorantItems] = useState([]);

  const getRestorantData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}restorantMaster/restaurants`
      );
      setRestorantItems(response.data.data);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    getRestorantData();
  }, []);

  return (
   <>
   <AdminNavbar/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/CreateRestorant" className="btn btn-primary">
              Add Restaurant
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Rest Id</th>
                  <th scope="col">Rest Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {restorantItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Rest_id}</td>
                    <td>{item.Rest_Name}</td>
                    <td>{item.Address}</td>
                    <td>{item.Mobile_No}</td>
                    <td>{item.Rest_CreatedDate}</td>
                    <td>{item.Created_by}</td>
                    <td>
                      <button
                        className={`btn ${
                          item.Rest_Status === "Active"
                            ? "btn-success"
                            : "btn-danger"
                        }`}
                      >
                        {item.Rest_Status}
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/CreateOutlate/${item._id}`}
                        className="btn btn-primary m-1"
                      >
                        Add Outlate
                      </Link>
                      <Link
                        to={`/UpdateRestorant/${item._id}`}
                        className="btn btn-primary m-1"
                      >
                        Edit
                      </Link>
                      {/* <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button> */}
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

export default ShowRestorant;
