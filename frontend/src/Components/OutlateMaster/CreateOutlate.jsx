import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const CreateOutlate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    Outlet_name: Yup.string().required("Outlet Name is required"),
    Address: Yup.string().required("Address is required"),
    Mobile_No: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    Created_by: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      Rest_id: id,
      Outlet_name: "",
      Address: "",
      Mobile_No: "",
      Created_by: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(process.env.REACT_APP_SERVER_API + "outlateMaster/outlates", values)
        .then((response) => {
          console.log("Success:", response.data);
          navigate("/ShowOutlate");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  const handlePhoneChange = (e) => {
    if (e.target.value.length <= 10) {
      formik.handleChange(e);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-4 shadow p-3 mb-5 bg-body rounded">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-1">
                <Link to="/ShowRestorant">
                  <IoArrowBackCircleOutline
                    style={{ color: "black" }}
                    size={30}
                  />
                </Link>
              </div>
              <div className="col-md-11 text-center">
                <h3>Outlate Master</h3>
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Outlet Name"
                name="Outlet_name"
                value={formik.values.Outlet_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Outlet_name && formik.errors.Outlet_name && (
                <div className="text-danger">
                  {formik.errors.Outlet_name}
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="Address"
                value={formik.values.Address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Address && formik.errors.Address && (
                <div className="text-danger">{formik.errors.Address}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="Mobile_No"
                value={formik.values.Mobile_No}
                onChange={handlePhoneChange}
                onBlur={formik.handleBlur}
                maxLength={10}
              />
              {formik.touched.Mobile_No && formik.errors.Mobile_No && (
                <div className="text-danger">{formik.errors.Mobile_No}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Created By"
                name="Created_by"
                value={formik.values.Created_by}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Created_by && formik.errors.Created_by && (
                <div className="text-danger">{formik.errors.Created_by}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOutlate;
