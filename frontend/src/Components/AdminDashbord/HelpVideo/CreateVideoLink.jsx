import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Video Name is required"),
  Category: Yup.string().required("Category is required"),
  VideoLink: Yup.string().url("Please enter a valid URL").required("Video Link is required"),
});

const CreateVideoLink = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: "",
      Category: "",
      VideoLink: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_API}HelpVideo`, 
          values
        );
        console.log("Success:", response.data);
        navigate("/HelpButtonDataShow"); 
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <>
     
      <div className="container-fluid">
        <div className="row d-flex justify-content-center text-center mt-5">
          <div className="col-md-4 shadow p-3 mb-5 bg-body rounded">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-1">
                  <Link to="/HelpButtonDataShow">
                    <IoArrowBackCircleOutline style={{ color: "black" }} size={30} />
                  </Link>
                </div>
                <div className="col-md-11 text-center">
                  <h3>Create Video Link</h3>
                </div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Video Name"
                  name="Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Name && formik.errors.Name && (
                  <div className="text-danger">{formik.errors.Name}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  name="Category"
                  value={formik.values.Category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Category && formik.errors.Category && (
                  <div className="text-danger">{formik.errors.Category}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Video Link"
                  name="VideoLink"
                  value={formik.values.VideoLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.VideoLink && formik.errors.VideoLink && (
                  <div className="text-danger">{formik.errors.VideoLink}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVideoLink;
