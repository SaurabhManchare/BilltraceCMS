import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVideoData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateVideo, setUpdateVideo] = useState({
    Name: "",
    Category: "",
    VideoLink: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateVideo((prevVideo) => ({ ...prevVideo, [name]: value }));
  };

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}HelpVideo/${id}`);
      const { Name, Category, VideoLink } = response.data.data;
      setUpdateVideo({ Name, Category, VideoLink });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [id]); 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_API}HelpVideo/${id}`, updateVideo);
      console.log("Data successfully updated");
      navigate("/HelpButtonDataShow");
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center text-center mt-5">
        <div className="col-md-4 shadow p-3 mb-5 bg-body rounded">
          <h3>Update Video</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Video Name"
                name="Name"
                value={updateVideo.Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                name="Category"
                value={updateVideo.Category}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Video Link"
                name="VideoLink"
                value={updateVideo.VideoLink}
                onChange={handleChange}
              />
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

export default UpdateVideoData;
