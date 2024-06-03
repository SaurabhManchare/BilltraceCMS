import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const CreateUserWiseRestOutlet = () => {
    const [userData, setUserData] = useState([]);
    const [restaurantname, setRestaurantName] = useState([]);
    const [outlateData, setOutlateData] = useState([]);
    const [selectedrestId, setSelectedRestId] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState(""); 
    const [selectedOutlet, setSelectedOutlet] = useState(""); 
    const [selectedOutlateId, setSelectedOutlateId] = useState(""); 

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_SERVER_API + "userdata"
            );
            setUserData(response.data.data || []);
        } catch (error) {
            console.error("Error Fetching User Data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUserChange = (event) => {
        const selectedUser = userData.find(
            (user) => user.User_Name === event.target.value
        );
        setSelectedUserId(selectedUser ? selectedUser._id : "");
        setSelectedUsername(event.target.value);
    };

    const fetchRestaurantData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_SERVER_API + "restorantMaster/restaurants"
            );
            setRestaurantName(response.data.data || []);
        } catch (error) {
            console.error("Error Fetching Restaurant Data", error);
        }
    };

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    const handleRestaurantChange = (event) => {
        setSelectedRestaurant(event.target.value); 
        const selectedRestaurant = restaurantname.find(
            (restaurant) => restaurant.Rest_Name === event.target.value
        );
        setSelectedRestId(selectedRestaurant ? selectedRestaurant._id : "");
    };
   
    const fetchOutlateData = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_SERVER_API + "outlateMaster/outlates"
          );
          setOutlateData(response.data.data || []); 
        } catch (error) {
          console.error("Error Fetching Outlet Data", error);
        }
      };
    
      useEffect(() => {
        fetchOutlateData();
      }, []);

    const handleOutletChange = (event) => {
        setSelectedOutlet(event.target.value); 
        const selectedOutlate = outlateData.find(
            (outlate) => outlate.Outlet_name === event.target.value
        );
        setSelectedOutlateId(selectedOutlate ? selectedOutlate._id : ""); // Update selected outlate ID
    };

    const handalsubmit = async (event) => {
        event.preventDefault();
        const data = {
            UserId: selectedUserId,
            RestorantId: selectedrestId,
            OutletId: selectedOutlateId
        };
        try {
            const response = await axios.post(
                process.env.REACT_APP_SERVER_API + "UserWiseRestAndOutlet/UserWiseRestAndOutlet",
                data
            );
            console.log("Response:", response.data);
            // Handle successful response
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    }

    return (
       <>
       <AdminNavbar/>
       <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handalsubmit}>
                        <h3>Create Restaurant & Outlet User</h3>
                        <div className="mb-3 mt-3">
                            <select
                                className="form-select"
                                aria-label="Select User"
                                onChange={handleUserChange}
                                value={selectedUsername}
                            >
                                <option value="" disabled>Select User Name</option>
                                {userData.map((user) => (
                                    <option key={user._id} value={user.User_Name}>
                                        {user.User_Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                       
                        <div className="mb-3">
                            <select
                                className="form-select"
                                aria-label="Select Restaurant Name"
                                onChange={handleRestaurantChange}
                                value={selectedRestaurant}
                            >
                                <option value="" disabled>Select Restaurant Name</option>
                                {restaurantname.map((restaurant) => (
                                    <option key={restaurant._id} value={restaurant.Rest_Name}>
                                        {restaurant.Rest_Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <select
                                className="form-select"
                                aria-label="Select Outlet"
                                onChange={handleOutletChange}
                                value={selectedOutlet}
                            >
                                <option value="" disabled>Select Outlet</option>
                                {outlateData.map((outlate) => (
                                    <option key={outlate._id} value={outlate.Outlet_name}>
                                        {outlate.Outlet_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                      
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
       </>
    );
};

export default CreateUserWiseRestOutlet;
