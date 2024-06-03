import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link } from "react-router-dom";

const HelpButtonShowData = () => {
  const [helpVideos, setHelpVideos] = useState([]);

  const getHelpVideos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}HelpVideo`
      );
      setHelpVideos(response.data.data || []);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    getHelpVideos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_API}HelpVideo/${id}`
      );
      setHelpVideos(helpVideos.filter((video) => video._id !== id));
      console.log("Video deleted successfully");
      alert("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <>
     <AdminNavbar />
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="d-flex justify-content-end">
            <Link to="/CreateHelpVideo" className="btn btn-primary">
              Add Video
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {helpVideos.map((video, index) => (
                  <tr key={video._id}>
                    <td>{video.Name}</td>
                    <td>{video.Category}</td>
                  
                    <td>
                      <Link
                        to={`/UpdateVideoData/${video._id}`}
                        className="btn btn-primary m-1"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(video._id)}
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
    </>
  );
};

export default HelpButtonShowData;
