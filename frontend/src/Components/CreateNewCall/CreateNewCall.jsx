import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminDashbord/AdminNavbar/AdminNavbar";

const defaultValue = {
  newCallCategoryName: "",
};

const CreateNewCall = () => {
  const [newCallCategory, setNewCallCategory] = useState(defaultValue);
  const [newSubCategory, setNewSubCategory] = useState({
    newCallCategoryID: "",
    newCallSubCategoryName: "",
  });
  const [newSubSubCategory, setNewSubSubCategory] = useState({
    newCallCategoryID: "",
    newCallSubCategoryID: "",
    newCallSubSubCategoryName: ""
  });
  const [newCallCategorySelect, setNewCallCategorySelect] = useState([]);
  const [newCallSubCategorySelect, setNewCallSubCategorySelect] = useState([]);

  useEffect(() => {
    fetchCallData();
    fetchSubCategoryData();
  }, []);

  const fetchCallData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_API + "NewCallCategery/Categery");
      setNewCallCategorySelect(response.data.data);
    } catch (error) {
      console.error("Error Fetching Category Data", error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_API + "NewCallCategery/Categery", newCallCategory);
      console.log("Category added successfully:", response.data);
      setNewCallCategory(defaultValue);
      fetchCallData();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const fetchSubCategoryData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_API + "NewCallSubCategery/SubCategery");
      setNewCallSubCategorySelect(response.data.data);
    } catch (error) {
      console.error("Error Fetching Subcategory Data", error);
    }
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_API + "NewCallSubCategery/SubCategery", newSubCategory);
      console.log("Subcategory added successfully:", response.data);
      setNewSubCategory({
        newCallCategoryID: "",
        newCallSubCategoryName: "",
      });
      fetchSubCategoryData();
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleSubmitSubSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_API + "NewCallSubSubCategery/SubSubCategery", newSubSubCategory);
      console.log("Subsubcategory added successfully:", response.data);
      setNewSubSubCategory({
        newCallCategoryID: "",
        newCallSubCategoryID: "",
        newCallSubSubCategoryName: ""
      });
    } catch (error) {
      console.error("Error adding subsubcategory:", error);
    }
  };

  const handleChangeCategoryID = (e) => {
    const { name, value } = e.target;
    setNewSubCategory({ ...newSubCategory, [name]: value });
  };

  // const handleChangeSubSubCategory = (e) => {
  //   const { name, value } = e.target;
  //   setNewSubSubCategory({ ...newSubSubCategory, [name]: value });
  // };

  return (
    <>
    <AdminNavbar/>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
        <div className="container-fluid">
        <div className="row d-flex justify-content-center text-center">
          <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <h3>Create Category</h3>
            <form onSubmit={handleSubmitCategory}>
              <div className="mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  name="newCallCategoryName"
                  value={newCallCategory.newCallCategoryName}
                  onChange={(e) => setNewCallCategory({ ...newCallCategory, newCallCategoryName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
        <div className="col-md-4">
        <div className="container-fluid">
        <div className="row d-flex justify-content-center text-center">
          <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <h3>Create Subcategory</h3>
            <form onSubmit={handleSubmitSubCategory}>
              <div className="mb-3 mt-5">
                <select
                  className="form-select"
                  name="newCallCategoryID"
                  value={newSubCategory.newCallCategoryID}
                  onChange={handleChangeCategoryID}
                >
                  <option value="">Select Category</option>
                  {newCallCategorySelect.map((category) => (
                    <option key={category._id} value={category._id}>{category.newCallCategoryName}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subcategory Name"
                  name="newCallSubCategoryName"
                  value={newSubCategory.newCallSubCategoryName}
                  onChange={(e) => setNewSubCategory({ ...newSubCategory, newCallSubCategoryName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Add Subcategory</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
        <div className="col-md-4">
        <div className="container-fluid">
        <div className="row d-flex justify-content-center text-center">
          <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <h3>Create Subsubcategory</h3>
            <form onSubmit={handleSubmitSubSubCategory}>
            
              <div className="mb-3 mt-5">
                <select
                  className="form-select"
                  name="newCallSubCategoryID"
                  value={newSubSubCategory.newCallSubCategoryID}
                  onChange={(e) => setNewSubSubCategory({ ...newSubSubCategory, newCallSubCategoryID: e.target.value })}
                >
                  <option value ="">Select Subcategory</option>
                  {newCallSubCategorySelect.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.newCallSubCategoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subsubcategory Name"
                  name="newCallSubSubCategoryName"
                  value={newSubSubCategory.newCallSubSubCategoryName}
                  onChange={(e) => setNewSubSubCategory({ ...newSubSubCategory, newCallSubSubCategoryName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Add Subsubcategory</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>

      

     

     
    </>
  );
};

export default CreateNewCall;

