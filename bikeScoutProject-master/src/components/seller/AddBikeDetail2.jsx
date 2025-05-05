import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddBikeDetail2 = () => {
  const Navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");

    console.log(data.image[0]);

    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("model", data.model);
    formData.append("year", data.year);
    formData.append("variant", data.variant);
    formData.append("mileage", data.mileage);
    formData.append("fuelType", data.fuelType);
    formData.append("type", data.type);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("descripiton", data.descripiton);
    formData.append("listingDate", data.listingDate);
    formData.append("registationNum", data.registationNum);
    formData.append("stateId", data.stateId);
    formData.append("cityId", data.cityId);
    formData.append("areaId", data.areaId);
    formData.append("image", data.image[0]);
    formData.append("userId", data.userId);

    try {
      await axios.post("/bike/addbikeWithfile", formData);
      toast.success("🚀 Car added successfully!", {
        className: "toast-success",
      });

      setTimeout(() => {
        Navigate("/seller/mybikes");
      }, 2000);
    } catch (error) {
      toast.error("❌ Failed to add car!", { className: "toast-error" });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />

      <style>{`
        .card:hover {
          transform: none !important;
          filter: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div style={containerStyle}>
        <div
          style={cardContainerStyle}
          className="card card-info card-outline mb-4"
        >
          <div style={cardHeaderStyle} className="card-header">
            <div style={cardHeaderTitleStyle} className="card-title">
              <h1 style={headerTextStyle}>addCarDetail</h1>
            </div>
          </div>
          <form
            style={formStyle}
            className="needs-validation"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div style={cardBodyStyle} className="card-body">
              <div style={formRowStyle} className="row g-3">
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustom01"
                    className="form-label"
                  >
                    brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Enter car BrandName"
                    {...register("brand")}
                    style={inputStyle}
                  />
                  <div style={feedbackStyle} className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustom02"
                    className="form-label"
                  >
                    model
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Enter Car modelName"
                    {...register("model")}
                    style={inputStyle}
                  />
                  <div style={feedbackStyle} className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    year
                  </label>
                  <input
                    type="text"
                    // type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car manufacture date"
                    {...register("year")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid year.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    variant
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car variant"
                    {...register("variant")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid variant.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    mileage
                  </label>
                  <input
                    type="text"
                    // type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car mileage"
                    {...register("mileage")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid mileage.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    fuelType
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car fuelType"
                    {...register("fuelType")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid fuel type.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter type of Car"
                    {...register("type")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid type.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    price
                  </label>
                  <input
                    type="text"
                    // type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car price"
                    {...register("price")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid price.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    color
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car color"
                    {...register("color")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid color.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car description"
                    {...register("descripiton")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid description.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    listingDate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter date"
                    {...register("listingDate")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid date.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    registationNum
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car registationNum"
                    {...register("registationNum")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid registration number.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustom04"
                    className="form-label"
                  >
                    select state
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    {...register("stateId")}
                    style={selectStyle}
                    onChange={(event) => {
                      getCityByStateId(event.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      select state
                    </option>
                    {states?.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please select a valid state.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustom04"
                    className="form-label"
                  >
                    select city
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    {...register("cityId")}
                    style={selectStyle}
                    onChange={(event) => {
                      getAreaByCityId(event.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      select city
                    </option>
                    {cities?.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please select a valid city.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustom04"
                    className="form-label"
                  >
                    select Area
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    {...register("areaId")}
                    style={selectStyle}
                  >
                    <option value="" disabled selected>
                      select Area
                    </option>
                    {areas?.map((area) => (
                      <option key={area._id} value={area._id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please select a valid area.
                  </div>
                </div>
                <div style={formGroupStyle} className="col-md-6">
                  <label
                    style={labelStyle}
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    Select CARURL
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car image"
                    {...register("image")}
                    style={inputStyle}
                  />
                  <div
                    style={invalidFeedbackStyle}
                    className="invalid-feedback"
                  >
                    Please choose a valid file.
                  </div>
                </div>
              </div>
            </div>
            <div style={cardFooterContainerStyle} className="card-footer">
              <button
                style={submitButtonStyle}
                className="btn"
                type="submit"
                onMouseEnter={(e) => (e.target.style.background = "#2f80ed")}
                onMouseLeave={(e) =>
                  (e.target.style.background =
                    "linear-gradient(90deg, #56ccf2, #2f80ed)")
                }
              >
                addCarDetail
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const cardHeaderTitleStyle = {
  textAlign: "center",
};

const formStyle = {
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "5px",
  transition: "none",
};

const formRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

const formGroupStyle = {
  flex: "1 1 45%",
};

const inputStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
};

const selectStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
};

const feedbackStyle = {
  color: "green",
};

const invalidFeedbackStyle = {
  color: "red",
};

const cardFooterContainerStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#283e51",
};

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #4b79a1, #283e51)",
  padding: "20px",
};

const cardContainerStyle = {
  width: "100%",
  maxWidth: "900px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  overflow: "hidden",
};

const cardHeaderStyle = {
  backgroundColor: "#283e51",
  padding: "20px",
};

const headerTextStyle = {
  color: "#F1C40F",
  textShadow: "3px 3px 8px rgba(0,0,0,0.8)",
  paddingLeft: "280px",
};

const cardBodyStyle = {
  padding: "20px",
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "5px",
};

const submitButtonStyle = {
  width: "100%",
  maxWidth: "300px",
  height: "50px",
  fontSize: "1.2rem",
  background: "linear-gradient(90deg, #56ccf2, #2f80ed)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
};

export default AddBikeDetail2;
