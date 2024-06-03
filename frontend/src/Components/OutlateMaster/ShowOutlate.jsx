import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowOutlate = () => {
  const [outlateItems, setOutlateItems] = useState([]);

  const getOutlateData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}outlateMaster/outlates`
      );
      setOutlateItems(response.data.data || []); // Use response.data.data or fallback to an empty array
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    getOutlateData();
  }, []); // Empty dependency array to run only once on mount

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_API}outlateMaster/outlates/${id}`
      );

      setOutlateItems(outlateItems.filter((item) => item._id !== id));
      console.log("Item deleted successfully");
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleMobileCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="d-flex justify-content-end">
            <Link to="/ShowRestorant" className="btn btn-primary">
              Create Outlate
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th scope="col">Outlet ID</th>
                  <th scope="col">Outlet Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Restaurant Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {outlateItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Outlet_Id}</td>
                    <td>{item.Outlet_name}</td>
                    <td>{item.Address}</td>
                    <td>
                        <text

                          href={`tel:${item.Mobile_No}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileCall(item.Mobile_No);
                          }}
                        >
                          {item.Mobile_No}
                        </text>
                        </td>
                  
                    <td>{item.Rest_id.Rest_Name}</td>
                    <td>
                      <button
                        className={`btn ${
                          item.Outlet_Status === "Active"
                            ? "btn-success"
                            : "btn-danger"
                        }`}
                      >
                        {item.Outlet_Status}
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/UpdateOutlate/${item._id}`}
                        className="btn btn-primary m-1"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
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
  );
};

export default ShowOutlate;
