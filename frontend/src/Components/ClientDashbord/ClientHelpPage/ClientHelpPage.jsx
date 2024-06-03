import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientHelpPage = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( process.env.REACT_APP_SERVER_API + "HelpVideo");
        if (response.data.success) {
          const data = response.data.data;
          setVideos(data);
          const uniqueCategories = [...new Set(data.map(video => video.Category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedVideo(null); // Reset selected video when category changes
  };

  const handleVideoChange = (e) => {
    const videoLink = e.target.value;
    setSelectedVideo(videoLink);
  };

  const playSelectedVideo = () => {
    if (selectedVideo) {
      window.open(selectedVideo, "_blank"); // Open selected video link in new tab
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-6 shadow p-3 mb-5 bg-body rounded">
          <div className="mb-3 col-md-6">
            <select
              className="form-select"
              aria-label="Select Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option disabled value="Select Category">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Select Video"
              disabled={selectedCategory === "Select Category"}
              onChange={handleVideoChange}
              value={selectedVideo || ""}
            >
              <option disabled value="">Select Video</option>
              {videos
                .filter((video) => video.Category === selectedCategory)
                .map((video) => (
                  <option key={video.Id} value={video.VideoLink}>
                    {video.Name}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={playSelectedVideo}
            disabled={!selectedVideo}
          >
            Play Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientHelpPage;
