import React, { useState, useEffect } from "react";
import axios from "axios";


const CallShareSupportEngg = () => {
    
    const [userData, setUserData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUsername, setSelectedUsername] = useState("");

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_SERVER_API + "userdata"
            );
            setUserData(response.data.data.filter(user => user.User_Roleid === 3) || []);
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


    
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        
    };

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center">Call Provide SupportEngg</h3>
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
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CallShareSupportEngg;
